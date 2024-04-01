const express = require('express');
const messageController = require('../controller/messageController');
const authMiddleware = require("../authMiddleware/authMiddleware");

const router = express.Router();

router.get('/:id',authMiddleware,messageController.getMessage);
router.post('/send/:id',authMiddleware,messageController.sendMessage);

module.exports = router;