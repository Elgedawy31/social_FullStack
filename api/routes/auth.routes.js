const { RegisterFunc, LoginFunc } = require('../controllers/auth.controller')
const multerFunc = require('../utils/multerFunc')

const router = require('express').Router()

//REGISTER
router.post('/register'  , multerFunc().single('image'), RegisterFunc)
router.post('/login' , LoginFunc)



module.exports = router