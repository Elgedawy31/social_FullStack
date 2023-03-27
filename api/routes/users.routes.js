const { UpdateUser, DeleteUser, GetUser, FollowUser, UnFollowUser } = require('../controllers/user.controller')
const multerFunc = require('../utils/multerFunc')

const router = require('express').Router()



//UPDATE USER 
router.put('/:id' ,  multerFunc().single('image'), UpdateUser);



// DELETE USER 
router.delete('/:id' , DeleteUser)



//GET ONE UER 
router.get('/:id' , GetUser)


//FOLLOW A USER  
router.put('/follow/:id' , FollowUser)
router.put('/unfollow/:id' , UnFollowUser)



module.exports = router