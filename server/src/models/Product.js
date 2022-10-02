const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "please enter Product name"],
            trim: true
        },
        description: {
            type: String,
            require: [true, "please enter Product description"]
        },
        price: {
            type: Number,
            require: [true, "please enter Product price"],
            maxLength: [8, "Price can not longer than 8 characters"]
        },
        rating: {
            type: Number,
            default: 0
        },
        images: [
            {
                public_id: {
                    type: String,
                    require: true
                },
                url: {
                    type: String,
                    require: true
                },
            }],
    }
    //
    //     stock:{
    //         type:Number,
    //         require:[ true,'Please Enter Product Stock'],
    //         maxLength: [4,"stock cannot exceed 4 characters"],
    //         default: 1
    //     },
    //     numOfReviews:{
    //         type:Number,
    //         default:0
    //     },
    //     reviews:[
    //         {
    //             name:{
    //                 type:String,
    //                 require:true,
    //             },
    //             rating:{
    //                 type:Number,
    //                 require:true
    //             },
    //             comment:{
    //                 type:String,
    //                 require:true
    //             },
    //
    //
    //         brandId: {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Brand',
    //     },
    // },
    // {
    //     timestamps: true,
    // },
);

module.exports = mongoose.model('Product', ProductSchema);
// product chính là tên table trong data base
