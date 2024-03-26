const User = require('../models/userModel');
const {generateAccessToken, generateRefreshToken} = require("../utils/generateToken");
const jwt = require('jsonwebtoken');

class AuthController {
    async signup_get(req, res) {
        res.render('signup');
    }

    async signup_post(req, res) {
        const {fullName, userName, password, confirmPassword, gender } = req.body;
        try{
         const user = await User.signup(fullName, userName, password, confirmPassword, gender);
         //token
        const access_token = generateAccessToken(user._id);
        const refresh_token= generateRefreshToken(user._id, res);

        //save in database
            await User.findByIdAndUpdate(user._id, {refreshToken: refresh_token}, {new: true});

        console.log(user);
        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            profilePicture: user.profilePicture,
            access_token
        })
        }catch (e){
            console.log(e.message
            )
            res.status(400).json({error: e.message});
        }
    }

    async login_get(req, res) {
        res.render('login');
    }

    async login_post(req, res) {
        const {userName, password} = req.body;
        try{
            const user = await User.login(userName, password);
            //token
            const access_token = generateAccessToken(user._id);
            const refresh_token = generateRefreshToken(user._id, res);

            //save in database
            await User.findByIdAndUpdate(user._id, {refreshToken: refresh_token}, {new: true});

            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                profilePicture: user.profilePicture,
                access_token
            })
        }catch (e){
            res.status(400).json({error: e.message});
        }
    }

    async logout(req, res) {
        try{
            res.cookie('refreshToken', '', {
                maxAge: 0
            });
            res.status(200).json({message: 'Logout successfully'});
            res.redirect('/login');
        }catch (e){
            console.error(e.message)
            res.status(500).json({error: "Internal Server Error"});
        }
    }

    async refreshToken(req, res) {

        //check for refresh token
        const cookie = req.cookies;
        if(!cookie && !cookie.refreshToken){
            throw new Error('No token found');
        }

        //verify refresh token
        try{
            const {userId} = await jwt.verify(cookie.refreshToken, process.env.TOKEN_SECRET);
            const user =  await User.findOne({_id: userId, refreshToken: cookie.refreshToken}).select('_id')
            //generate new access token
            const newAccessToken = generateAccessToken(user._id,res);


           res.status(200).json({
                success: user ? true : false,
                newAccessToken
            });
        }catch (e){
            res.status(500).json({error: "Invalid refresh token"})
        }

    }
}

module.exports = new AuthController();