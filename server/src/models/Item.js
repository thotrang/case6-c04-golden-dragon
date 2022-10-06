const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const ItemSchema = new Schema({
    product:{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    amount:{
        type:Number,
        default: 0
    }
})

module.exports = mongoose.model("Item", ItemSchema);