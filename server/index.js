const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const router = require('./src/routers/router')
const fileupload = require('express-fileupload')
const server = http.createServer(app);
// const socketRoom = require('./src/socket/room')
const PORT = process.env.PORT
const URL = process.env.MONGO0DB_URL

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));
app.use(fileupload())

const connectDatabase = () => {
    mongoose.connect(URL)
        .then((data) => {
            console.log('db connect success');
        }).catch((err) => {
            console.log(err);
        })
}
connectDatabase();


const socketIO = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
})

socketIO.on('connection', (socket) => {
    console.log("New client connected" + socket.id)

    socket.on("sendDataClient", function (data) {
        socketIO.emit("sendDataServer", { data });
    })

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
})

// socketRoom.room(socketIO)

app.use('', router)
server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})