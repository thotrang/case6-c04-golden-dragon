const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    comment:{
        type:String
    }
})
module.exports = mongoose.model('Review', ReviewSchema)