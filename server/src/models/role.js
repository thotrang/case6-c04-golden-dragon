const mongoose = require("mongoose");

const RoleSchema = mongoose.Schema({
    name:{
        required : true,
        type : String
    },
    userId : {
        type : Schema.Type.ObjectId,
        ref : "User"
    }
})
module.exports = mongoose.model("Role",RoleSchema);