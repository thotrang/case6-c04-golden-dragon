const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    image: {

            public_id : {
                type : String,
                require:true
            },
            url : {
                type : String,
                require : true
            }
    },

    description : {
        type : String,
        require : true
    }


});
 module.exports = mongoose.model('Brand',BrandSchema);
