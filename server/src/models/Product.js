const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'please enter Product name'],
        },
        price: {
            type: String,
            required: [true, 'please enter Product price'],
        },
        description: {
            type: String,
            required: [true, 'please enter Product description'],
        },
        images: [
            {
                public_id: {
                    type: String,
                    require: true,
                },
                url: {
                    type: String,
                    require: true,
                },
            },
        ],
        reviews: [
            {
                user: {
                    type: mongoose.Schema.ObjectId,
                    ref: "User",
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                rating: {
                    type: Number,
                    required: true,
                },
                comment: {
                    type: String,
                    required: true,
                },
            },
        ],
        rating: {
            type: Number,
            default: 0,
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
        },
        brandId: {
            type: Schema.Types.ObjectId,
            ref: 'Brand',
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Product', ProductSchema);
// product chính là tên table trong data base
