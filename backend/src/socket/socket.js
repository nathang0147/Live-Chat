const {Server } = require("socket.io");
const express = require('express');
const http = require('http');

const app = express();

//create http server and add the express app as a listener
const server = http.createServer(app);

//add socket.io on top of express in http server
const io = new Server(server,{
    cors: {
        origin: "https://live-chat-gray.vercel.app/",
        methods: ["GET", "POST"],
        credentials: true
    }
})

const getReceiverId = (receiverId) => {
    return userSocketMap[receiverId];
};


const userSocketMap = {};

//listen to connection event
//the listener(socket) will be the userID
io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    const userId = socket.handshake.query.userId;

    //set userId: socket.id in the userSocketMap
    if(userId !== "undefined"){
        userSocketMap[userId] = socket.id;
    }

    //io.emit() send socket.id to the all users online
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    //socket.on() used to listen to an event, both client and server
    //check for disconnection
    socket.on('disconnect', (reason) => {
        console.log('user disconnected', socket.id, reason);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
})

module.exports = {app,io,server, getReceiverId};
