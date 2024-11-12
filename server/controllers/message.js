const message = require('../models/message');
const Message = require('../models/message');
const asyncHandler = require('express-async-handler')

// create Message 
const createMessage = asyncHandler(async (req, res) => {
    const {chatId, senderId, text} = req.body
    if(!chatId || !senderId || !text) throw new Error('Missing inputs')
    const message = new Message({
        chatId, senderId, text
    })
    const response = await message.save()
    return res.json({
        success: response ? true : false,
        createMessage: response ? response : 'Cannot create',
    });
});

// get message
const getMessage = asyncHandler(async (req, res) => {
    const {chatId } = req.params;
    if(!chatId ) throw new Error('Missing inputs')
    const response = await message.find({chatId})
    return res.json({
        success: response ? true : false,
        response: response ? response : 'Cannot create',
    });
});


module.exports = {
    createMessage,
    getMessage
   
}