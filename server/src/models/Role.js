const { Schema } = require('mongoose');
const mongoose = require("mongoose");

const RoleSchema = mongoose.Schema({
    name:{
        required : true,
        type : String
    },
    userId : [{
        type : Schema.Types.ObjectId,
        ref : "User"
    }]
})
module.exports = mongoose.model("Role",RoleSchema);ch