const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const cloudinary = require('cloudinary')
const dotenv = require('dotenv').config();
const router = require('./src/routers/router')
const fileupload = require('express-fileupload')
const Process = require("process");
const PORT = process.env.PORT
const URL = process.env.MONGO0DB_URL

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extends:true}));
app.use(fileupload())

const connectDatabase = () => {
    mongoose.connect(URL)
    .then((data)=>{
        console.log('db connect success');
    }).catch((err)=>{
        console.log(err);
    })
}
connectDatabase();

//cloudinary config
// cloudinary.config({
//     cloud_name:process.env.CLOUDINARY_NAME,
//     api_key:Process.env.API_KEY,
// api_secret:process.env.API_SERCET
// })





app.use('', router)
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})