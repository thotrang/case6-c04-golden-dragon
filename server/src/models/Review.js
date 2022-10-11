const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    comment:{
        type:String
    },
    rating:{
        type: Number,
        default: 0
    }
})
module.exports = mongoose.model('Review', ReviewSchema)