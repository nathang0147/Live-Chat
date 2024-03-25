const express = require('express');
const AuthController = require('../controller/authController');

const router = express.Router();

router.get('/signup', AuthController.signup_get);
router.post('/signup', AuthController.signup_post);

router.get('/login', AuthController.login_get);
router.post('/login', AuthController.login_post);

router.get('/logout', AuthController.logout);

module.exports = router;