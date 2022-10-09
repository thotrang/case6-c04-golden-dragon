const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const CartSchema = new Schema({
    itemId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        }
    ],
    totals: {
        type:Number,
        default: 0 
    },
    discount: {
        type: Schema.Types.ObjectId,
        ref: 'Discount'
    },
    bill: [{
        type:String
    }],
    userId:{
        type: Schema.Types.ObjectId,
        ref:'User'
    }
})

module.exports = mongoose.model("Cart", CartSchema);