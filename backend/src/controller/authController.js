const User = require('../models/userModel');

class AuthController {
    async signup_get(req, res) {
        res.render('signup');
    }

    async signup_post(req, res) {
        const {fullName, userName, password, confirmPassword, gender } = req.body;
        try{
         const user = await User.signup(fullName, userName, password, confirmPassword, gender);

        console.log(user);
        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            profilePicture: user.profilePicture,
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
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                profilePicture: user.profilePicture,
            })
        }catch (e){
            res.status(400).json({error: e.message});
        }
    }

    async logout(req, res) {
        res.send('user logout');
    }
}

module.exports = new AuthController();