const jwt = require('jsonwebtoken');

const generateTokenAndCookies = (userId,res) => {
    const token = jwt.sign({userId}, process.env.SECRET_KEY,{
        expiresIn: '15d'
    });

    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevent XSS attacks cross-site scripting
        sameSite: 'Strict', //CSRF attacks cross-site request forgery
    });

};

module.exports = generateTokenAndCookies;