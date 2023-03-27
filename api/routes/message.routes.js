const router = require('express').Router()
const {MessageModel} = require('../models/message.model.js')


//add 

router.post('/' , async (req  , res) => {

    const newMessage = new MessageModel(req.body)


    try {

        const savedMessage = await newMessage.save()

        res.status(200).json(savedMessage)
        
    } catch (error) {
        res.status(500).json(error)
    }


})
router.get('/:conid' , async (req  , res) => {



    try {

        const messages = await MessageModel.find({
            conId:req.params.conid
        })

        res.status(200).json(messages)
        
    } catch (error) {
        res.status(500).json(error)
    }


})


module.exports = router