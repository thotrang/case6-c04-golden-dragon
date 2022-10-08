const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'please enter name description'],
            minLength: [4, "min length 4"]
        },
        roleId: {
            type: Schema.Types.ObjectId,
            ref: 'Role',
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            maxLength: [10, 'max length 10'],
        },
        userName: {
            type: String,
            required: true,
            maxLength: [10, 'max length 10'],
            minLength: [4, "min length 4"],
        },
        gender: {
            type: String
        },
        dob: {
            type: String
        },
        avatar: {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
        address: {
            type: String
        },
        password: {
            type: String,
            required: true,
        },
        discounts: [{
            type: Schema.Types.ObjectId,
            ref: 'Discount'

        }],
        cartId:{
            type: Schema.Types.ObjectId,
            ref:'Cart'
        }

    },
    {
        timestamps: true,
    },
);
module.exports = mongoose.model('User', UserSchema);
