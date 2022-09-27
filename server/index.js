const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require("./routes/router");
const dotenv = require('dotenv').config();

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