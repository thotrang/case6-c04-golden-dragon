const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const CartSchema = new Schema({
    item: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        }
    ],
    total: Number,
    discount: {
        type: Schema.Types.ObjectId,
        ref: 'Discount'
    },
    bill: [{
        type: String
    }],
})

module.exports = mongoose.model("Cart", CartSchema);