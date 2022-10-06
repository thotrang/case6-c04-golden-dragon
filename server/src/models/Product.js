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
            required: [true, 'please enter Product description'],
        },
        stock: {
            type: Number,
            default: 0
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
        comment: {
            type: String,
        },
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
