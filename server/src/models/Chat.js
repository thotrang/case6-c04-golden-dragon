const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    message: [{
        text: {
            type: String
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
})
module.exports = mongoose.model("Chat", ChatSchema);
