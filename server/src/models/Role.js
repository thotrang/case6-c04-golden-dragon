const mongoose = require("mongoose");
const { Schema } = require('mongoose');


const RoleSchema = mongoose.Schema({
    name:{
        required : true,
        type : String
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
})
module.exports = mongoose.model("Role",RoleSchema);