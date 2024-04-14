require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./src/routes');
const cookieParser = require('cookie-parser');
const {app,io,server} = require("./src/socket/socket");

//Create express


//Use the express-static middleware
app.use(express.json()); // for parsing application/json for post/patch request to access to body(data) of request
app.use(cookieParser())
app.use(cors({
    origin: 'https://live-chat-gray.vercel.app/', // specify the origin
    credentials: true,  // allow credentials
}));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


//routes
routes(app);

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
      server.listen(process.env.PORT, () => {
        console.log(`Example app listening on port http://localhost:${process.env.PORT}`);
      });
    })
    .catch((err)=>{
        console.error(`Error connecting to the database. \n${err}`);
    });

