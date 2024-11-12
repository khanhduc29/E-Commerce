const Chat = require('../models/chat')

const asyncHandler = require('express-async-handler')

// // createChat 
const createChat = asyncHandler(async (req, res) => {
    const { firstId, secondId } = req.body
    const chat = await Chat.findOne({
        members: { $all: [firstId, secondId] }
    });
    if (chat) return res.json(chat);
    const newChat = new Chat({
        members: [firstId, secondId]
    })
    const response = await newChat.save()
    return res.status(200).json(response);
});


// findUsersChats
const findUsersChats = asyncHandler(async (req, res) => {
    const userId = req.params.userId
    const chats = await Chat.find({
        members: { $in: [userId] }
    });
    return res.status(200).json({
        success: chats ? true : false,
        chats: chats ? chats : 'Cannot get chats'
    })
})

//  findChat 
const findChat = asyncHandler(async (req, res) => {
    const { firstId, secondId } = req.params
    const chat = await Chat.find({
        members: { $all: [firstId, secondId] }
    })
    return res.status(200).json({
        success: chat ? true : false,
        chats: chat ? chat : 'Cannot get chats'
    })
})


module.exports = {
    createChat,
    findUsersChats,
    findChat,

}