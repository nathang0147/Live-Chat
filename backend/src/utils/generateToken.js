const jwt = require('jsonwebtoken');

const generateAccessToken = (userId) => {
   return  jwt.sign({userId}, process.env.TOKEN_SECRET,{
        expiresIn: '3m'
    });
}

const generateRefreshToken = (userId,res) => {
    const refresh_token = jwt.sign({userId}, process.env.TOKEN_SECRET,{
        expiresIn: '7d'
    });

    res.cookie('refreshToken',refresh_token,{
        maxAge:  7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict"
    });
    return refresh_token;
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
};