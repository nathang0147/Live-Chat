const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.get('/', userController.getUserForSidebar);

module.exports = router;