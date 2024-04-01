const express = require('express');
const userController = require('../controller/userController');
const authMiddleware = require("../authMiddleware/authMiddleware");

const router = express.Router();

router.get('/',authMiddleware, userController.getUserForSidebar);

module.exports = router;