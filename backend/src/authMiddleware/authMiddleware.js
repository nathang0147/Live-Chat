const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
    //vertify token
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({message: 'Unauthorized'});
    }

    const token = authorization.replace('Bearer ', '');

    if(!token){
        return res.status(401).json({message: 'Token is invalid'});
    }

    try{
        const {userId} = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log({userId})
        req.user =  await User.findOne({_id: userId}).select('-password')
        next();
    }catch (e){
        console.error(e.message);
        return res.status(401).json({message: 'Request is not authorized'});
    }
};

module.exports = authMiddleware;