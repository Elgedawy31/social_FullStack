const router = require('express').Router()
const {ConModel}  = require('../models/conversation.js')


//new conv 
router.post('/' ,async (req , res) => {
    try {

        const newconv = new ConModel({
            members: [req.body.senderId , req.body.receverId]
        })

        const response = await newconv.save();

        res.status(200).json(response)

    } catch (error) {
        res.status(500).json(error)
    }
})


//get cov of user


router.get('/:id' ,async (req , res) => {


    try {

        const conversation = await ConModel.find({
            members:{$in : [req.params.id]}
        })


        res.status(200).json(conversation)
        
    } catch (error) {
        
        res.status(500).json(error)

    }
})



module.exports = router