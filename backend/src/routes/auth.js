const express = require('express');
const AuthController = require('../controller/authController');
const {authMiddleware} = require('../authMiddleware/authMiddleware');

const router = express.Router();


router.post('/signup', AuthController.signup_post);
router.post('/login', AuthController.login_post);

router.post('/logout',AuthController.logout);

router.post('/refresh', AuthController.refreshToken);

module.exports = router;