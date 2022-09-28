const mongoose = require('mongoose') ;
const {Schema} = require('mongoose');

const DiscountSchema = new Schema({
    name : {
        required : true,
        type : String
    },
    productId :{
        type : Schema.Types.ObjectId,
        ref : "Product"
    }
})

module.exports = mongoose.model("Discount",DiscountSchema);