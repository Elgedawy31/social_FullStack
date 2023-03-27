const { UserModel } = require("../models/User.model");
var bcrypt = require("bcryptjs");


//REGISTER 

const RegisterFunc = async (req, res) => {


  
  
  
  try {
    
    const  fileName = `${req.protocol}://${req.headers.host}/${req.destFile}/${req.file.filename}`


    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password , salt);

    const newUser = new UserModel({password: hash , username:req.body.username , email : req.body.email, image: fileName});

    const userData = await newUser.save();

    res.status(200).json({ userData });
  } catch (error) {
    res.status(500).json({ error, message: "from register " });
  }
};




//LOGIN 

const LoginFunc = async (req, res) => {




  try {


    const userData = await UserModel.findOne({username: req.body.username})

    

    try {

       const bool = await bcrypt.compareSync(req.body.password , userData.password); // true

       bool ? res.status(200).json({userData}) : res.status(500).json({message:"username or password is wrong"})

        
    } catch (error) {
        
    res.status(500).json({ error, message: "password or username is wrong " });


    }

  } catch (error) {
    res.status(500).json({ error, message: "not found this username" });
  }
};



module.exports = { RegisterFunc ,LoginFunc };
