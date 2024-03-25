
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    profilePicture: {
        type: String,
        default: ""
    },
});

userSchema.statics.signup = async function(fullName, userName, password, confirmPassword, gender){
    if(!userName || !password){
        throw Error('All fields are required');
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol');
    }

    //PROFILE PICTURE
    const boyProfile = 'https://avatar.iran.liara.run/public/boy?username=' + userName;
    const girlProfile = 'https://avatar.iran.liara.run/public/girl?username=' + userName;

    //check exist user
    const existUser = await this.findOne({userName});
    if(existUser){
        throw Error('Username is already registered');
    }else{
        const salt = await bcrypt.genSalt();
        const passwordHashed = await bcrypt.hash(password, salt);

        const user = await this.create({
            fullName,
            userName,
            password: passwordHashed,
            gender,
            profilePicture: gender === "male" ? boyProfile : girlProfile
        });

        return user;
    }

}

userSchema.statics.login = async function(userName, password){
    if(!userName || !password){
        throw Error('All fields are required');
    }

    const user = await this.findOne({userName});
    if(!user){
        throw Error('Incorrect username');
    }

    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('Incorrect password');
    }
}




const User = mongoose.model('User', userSchema);

module.exports = User;