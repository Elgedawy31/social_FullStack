const { UserModel } = require("../models/User.model")
var bcrypt = require("bcryptjs");


//UPDATE USER
const UpdateUser =async (req , res , next) => {

    try {


            if(req.body.password) { 
                
                try {

                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.password , salt)
                    
                } catch (error) {
                    
                    return res.status(500).json({err})

                }
            }


            try {

                const user = await UserModel.findByIdAndUpdate(req.params.id , {$set :req.body } , {new:true})


                res.status(200).json({user  , mess:'updated'})


            } catch (error) {

                res.status(500).json({error})
                
            }

            
            
       

        
    } catch (error) {
        
        res.status(500).json({error ,})
    }


}


//DELETE USER

const DeleteUser = async (req, res , next) => {


    try {

        if (req.body.userId === req.params.id || req.body.isAdmin) {
        


                await UserModel.findByIdAndDelete(req.params.id)

                res.status(200).json('Done Deleted')
                
        

        }
        
    } catch (error) {
        
        res.status(500).json({error  , mess: 'You Can,t Delete This Account'})
        
    }


}

//GET ONE USER

const GetUser = async (req , res , next ) => {


    try {

        const User = await UserModel.findById(req.params.id)

        const {password , updatedAt , ...others} = User._doc
        
        res.status(200).json({others})
        
    } catch (error) {
        
        res.status(500).json({error , mess:'you cant find this data'})
    }


}


//FOLLOW A USER 

const FollowUser = async (req , res , next) => {


    if(req.body.userId !== req.params.id){

        try {

            const myuser = await UserModel.findOne({_id : req.params.id})

            // const user = await UserModel.findOne({_id : req.body.userId})

            if(!myuser.followers.includes(req.body.userId)){

                const DataUpdated = await UserModel.findByIdAndUpdate(req.params.id , { $push:{followers:req.body.userId} } , {new:true})
                await UserModel.findByIdAndUpdate(req.body.userId , {$push: {followins:req.params.id} } , {new:true})

                res.status(200).json({DataUpdated , messages:'now you follow da'})


            }else{

                const DataUpdated = await UserModel.findByIdAndUpdate(req.params.id , { $pull:{followers:req.body.userId} } , {new:true})
                await UserModel.findByIdAndUpdate(req.body.userId , {$pull: {followins:req.params.id} } , {new:true})

                res.status(200).json({DataUpdated , messages:'now you unfollow da'})

            }

            


        } catch (error) {

            res.status(500).json({error , })
            
        }
    }else{
        res.status(403).json('you can.t follow your self')
    }


}





//FOLLOW A USER 

const UnFollowUser = async (req , res , next) => {


    if(req.body.userId !== req.params.id){

        try {

            const myuser = await UserModel.findOne({_id : req.params.id})

            // const user = await UserModel.findOne({_id : req.body.userId})

            if(myuser.followers.includes(req.body.userId)){

                const DataUpdated = await UserModel.findByIdAndUpdate(req.params.id , { $pull:{followers:req.body.userId} } , {new:true})
                await UserModel.findByIdAndUpdate(req.body.userId , {$pull: {followins:req.params.id} } , {new:true})

                res.status(200).json({DataUpdated , messages:'now you unfollow da'})


            }else{

                res.status(403).json({mess:'you allready Unfollow this person '})

            }

            


        } catch (error) {

            res.status(500).json({error , })
            
        }
    }else{
        res.status(403).json('you can.t follow your self')
    }


}




module.exports = {UpdateUser , DeleteUser , GetUser , FollowUser , UnFollowUser}