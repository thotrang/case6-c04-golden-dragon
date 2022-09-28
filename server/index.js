const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const dotenv = require('dotenv').config();
const router = require('./src/routers/router')
const PORT = process.env.PORT
const URL = process.env.MONGO0DB_URL

app.use(cors());
app.use(bodyParser.json());

const connectDatabase = () => {
    mongoose.connect(URL)
    .then((data)=>{
        console.log('db connect success');
    }).catch((err)=>{
        console.log(err);
    })
}
connectDatabase();
app.use('', router)
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})