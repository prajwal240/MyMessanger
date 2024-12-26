require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require("socket.io");
const messageControls = require('./controllers/messagecontrols');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL).catch((err) => console.log("Error in connecting"));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL
    }
});

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

messageControls(io);

const userroutes = require('./routes/userroutes');
app.use("", userroutes);

const PORT=process.env.PORT || 8002
server.listen(PORT, () => console.log('Server started on port 8001'));
