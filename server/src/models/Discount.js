const mongoose = require('mongoose') ;
const {Schema} = require('mongoose');

const DiscountSchema = new Schema({
    number: {
        type:Number
    },
    name: {
        type: String
    }
})

module.exports = mongoose.model("Discount",DiscountSchema);