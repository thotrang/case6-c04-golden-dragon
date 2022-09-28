const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxLenght: [10, 'please enter name description '],
        },
        role: {
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
            maxLenght: [10, 'please enter phone description '],
        },
        userName: {
            type: String,
            required: true,
            maxLenght: [10, 'please enter username description '],
        },
        gender: {
            type: String,
            required: true,
        },
        dob: {
            type: String,
            required: true,
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
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            maxLenght: [10, 'please enter password description '],
        },
        cardId: {
            type: Schema.Types.ObjectId,
            ref: 'Cart',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);
module.exports = mongoose.model('User', UserSchema);
