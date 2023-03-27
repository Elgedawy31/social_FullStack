const { PostModel } = require("../models/post.model");
const {UserModel} = require('../models/User.model')
//CREATE A POST
const CreatePost = async (req, res, next) => {
  
  try {
    
    const  fileName = `${req.protocol}://${req.headers.host}/${req.destFile}/${req.file.filename}` 
    
    const newPost = new PostModel({userId: req.params.id , desc:req.body.desc  , image:fileName || ''});

    const savedPost = await newPost.save();

    res.status(200).json({ savedPost });
  } catch (error) {
    res.status(500).json({ error });
  }
};

//UPDATE A POST
const UpdatePost = async (req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.id);

    if (post.userId === req.body.userId) {
      try {
        const updatedPost = await PostModel.findOneAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );

        res.status(200).json({ updatedPost });
      } catch (error) {
        res.status(500).json({ error });
      }
    } else {
      res.status(500).json({ messg: "you can not update this post" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

//DELETE A POST
const DeletePost = async (req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.id);

    if (post.userId === req.body.userId) {
      try {
        await PostModel.deleteOne({ _id: req.params.id });

        res.status(200).json("Done DEleted");
      } catch (error) {
        res.status(500).json({ error, mess: "cant see this post" });
      }
    } else {
      res.status(500).json({ messg: "you can not update this post" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

//like A POST
const likeApost = async (req, res, next) => {
  try {
    const LikePost = await PostModel.findById(req.params.id);

    if (!LikePost.likes.includes(req.body.userId)) {
      const newData = await PostModel.findByIdAndUpdate(
        req.params.id,
        { $push: { likes: req.body.userId } },
        { new: true }
      );

      res.status(200).json({newData , message:'liked'});
    } else {
      const newData = await PostModel.findByIdAndUpdate(
        req.params.id,
        { $pull: { likes: req.body.userId } },
        { new: true }
      );

      res.status(200).json({newData , message:'unliked'});
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

//GET A POST 
const getPost = async (req , res , next) => {
    try {

        const post = await PostModel.findById(req.params.id)

        res.status(200).json(post)
        
    } catch (error) {
        
        res.status(500).json({error , message:'not found the post'})

    }
}

const TimeLine = async (req , res ,next) => {


  try {

    const currentUser = await UserModel.findById(req.params.userId);
    const userPosts = await (await PostModel.find({userId:currentUser._id})).reverse();

    
    const friendPots = await  Promise.all(
      currentUser.followins.map(async (friendId) => {
        return PostModel.find({userId : friendId})
      })
    )

    res.status(200).json(userPosts.concat(friendPots))
    // const da = Promise.all(currentUser.followins.map( async(e) => res.status(200).json( userPosts.concat(await PostModel.find({userId : e})))))


    
  } catch (error) {
    
    res.status(500).json(error)


  }

}

module.exports = { CreatePost, UpdatePost, DeletePost, likeApost , getPost , TimeLine };
