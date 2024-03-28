const express = require('express');
const messageController = require('../controller/messageController');

const router = express.Router();

router.get('/send/:id',messageController.send);