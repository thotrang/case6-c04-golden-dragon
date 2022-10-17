const Chat = require('../models/Chat')

// const addChat = async (req, res, next) => {
//     try {
//         let data = req.body;
//         const chat = await Chat.create({
//             userId: data.userId,
//             message: [data]
//         })
//         res.status(200).json(product)
//     } catch (err) {
//         res.status(400).json(err)
//     }
// }
const addMessage = async (req, res, next) => {
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
            const chat = await Chat.create({
                userId: data.userId,
                message: [data]
            })
            res.status(200).json(chat)
        } else {
            const chat = await Chat.findByIdAndUpdate(
                {
                    _id: id
                }, {
                $push: { message: data }
            })
            res.status(200).json(chat)
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
    addMessage
}