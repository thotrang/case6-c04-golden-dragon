const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true,'please enter name description'],
            maxLength: [10, 'max length 10'],
        },
        roleId: {
            type: Schema.Types.ObjectId,
            ref: 'Role',
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        phone: {
            type: String,
            require: true,
            maxLength: [10, 'max lenght 10'],
        },
        userName: {
            type: String,
            require: true,
            maxLength: [10, 'max lenght 10'],
        },
        gender: {
            type: String,
            require: true,
        },
        dob: {
            type: String,
            require: true,
        },
        avatar: {
            public_id: {
                type: String,
                require: true,
            },
            url: {
                type: String,
                require: true,
            },
        },
        address: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
            maxLength: [10, 'max lenght 10'],
        },
        cardId: {
            type: Schema.Types.ObjectId,
            ref: 'Cart',
            require: true,
        },
    },
    {
        timestamps: true,
    },
);
module.exports = mongoose.model('User', UserSchema);
