const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    ID:{
        type:String
    },
    shipping: {
        type: String
    },
    payment: {
        type: String
    },
    status: {
        type: String,
        default: 'pending'
    },
    content: {
        item: [],
        totals: Number
    },
    userId: {
        required:true,
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})
module.exports = mongoose.model('Order', OrderSchema)