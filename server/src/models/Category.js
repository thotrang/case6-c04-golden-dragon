const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name : {
        required : true,
        type : String
    }
})
module.exports = mongoose.model("Category", CategorySchema) 