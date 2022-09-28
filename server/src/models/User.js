const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'please enter name description'],
            maxLength: [10, 'max length 10'], // quá ít
        },
        roleId: {
            // type: Schema.Types.ObjectId,
            // ref: 'Role',
            // required: true,
            type: String,
            default: 'user',
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            // required: true,
            maxLength: [10, 'max length 10'],
        },
        userName: {
            type: String,
            required: true,
            maxLength: [10, 'max length 10'],
        },
        gender: {
            type: String,
            default: 'Nam',
        },
        dob: {
            type: String,
            default: '7/9/2000',
        },
        avatar: {
            // public_id: {
            //     type: String,
            //     required: true,
            // },
            // url: {
            //     type: String,
            //     required: true,
            // },
            type: String,
            default: 'ảnh',
        },
        address: {
            type: String,
            // require: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);
module.exports = mongoose.model('User', UserSchema);
