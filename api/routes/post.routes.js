const { CreatePost, UpdatePost, DeletePost, likeApost, getPost, TimeLine } = require('../controllers/post.controller')
const multerFunc = require('../utils/multerFunc')

const router =require('express').Router()


//create a post 
router.post('/:id' ,multerFunc().single('image') , CreatePost)



//update a post 
router.put('/:id' , UpdatePost)




//delete a post 
router.delete('/:id' , DeletePost)


//like a post 
router.put('/like/:id' , likeApost)


//get a timeline 
router.get('/timeline/:userId' , TimeLine)


//get a post 
router.get('/:id' , getPost)






module.exports = router