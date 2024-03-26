const express = require('express');
const AuthController = require('../controller/authController');
const {authMiddleware} = require('../authMiddleware/authMiddleware');

const router = express.Router();

router.get('/signup', AuthController.signup_get);
router.post('/signup', AuthController.signup_post);

router.get('/login', AuthController.login_get);
router.post('/login', AuthController.login_post);

router.get('/logout',AuthController.logout);

router.post('/refresh', AuthController.refreshToken);

module.exports = router;