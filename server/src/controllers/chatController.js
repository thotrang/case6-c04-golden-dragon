const Chat = require('../models/Chat')

const getAllChat = async (req, res, next) => {
    try {
        let chats = await Chat.find().populate('userId')
        // let arr = chats.filter(item => {return item.message[0] != null })
        res.status(200).json(chats)
    } catch (err) {
        res.status(400).json(err)
    }
}
const getDeltaiChat = async (req, res, next) => {
    try {
        let id = req.params.id
        let chat = await Chat.findById(id).populate('userId')
        if (!chat) {
            res.status(404).json({
                message: "not found"
            })
        } else {
            res.status(200).json(chat)
        }
    } catch (err) {
        res.status(400).json(err)
    }
}
const addChat = async (req, res, next) => {
    try {
        let data = req.body;
        let chats = await Chat.find()
        let id = false;
        for (let chat of chats) {
            if (chat.userId == data.userId) {
                id = chat._id
            }
        }
        if (id === false) {
            console.log('add');
            const chat = await Chat.create({
                userId: data.userId,
                message:[]
            })
            return res.status(200).json(chat)
        } else {
            console.log('find');
            const chat = await Chat.findById(id).populate('userId')
            return res.status(200).json(chat)
        }
    } catch (err) {
        res.status(400).json(err)
    }
}
const addMessage = async (req, res, next) => {
    try {
        let id = req.params.id
        let chat = await Chat.findById(id)
        if (!chat) {
            res.status(404).json({
                message: "not found"
            })
        } else {
            let data = req.body;
            await Chat.findByIdAndUpdate(
                {
                    _id: id
                }, {
                $push: { message: data }
            })
            const chat1 = await Chat.findById(id).populate('userId')
            res.status(200).json(chat1)
        }
    } catch (err) {
        res.status(400).json(err)
    }
}

const deleteMessage = async (req, res, next) => {
    try {

    } catch (err) {
        res.status(400).json(err)
    }
}
const deleteChat = async (req, res, next) => {
    try {

    } catch (err) {
        res.status(400).json(err)
    }
}
const findMessage = async (req, res, next) => {
    try {

    } catch (err) {
        res.status(400).json(err)
    }
}
module.exports = {
    findMessage,
    deleteChat,
    deleteMessage,
    addMessage,
    getAllChat,
    getDeltaiChat,
    addChat
}