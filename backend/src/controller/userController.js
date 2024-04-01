const User = require('../models/userModel');

class userController {
    async getUserForSidebar(req, res){
        try{
            const loggedInUserId = req.user._id;
            const filteredUsers = await User.find({ _id: { $ne: loggedInUserId }} ).select("-password"); // Find all users except the logged in user

            res.status(200).json(filteredUsers);
        }catch (e){
            console.log(e.message)
            res.status(500).json({message: 'Error in userController getUserForSidebar'})
        }
    }
}

module.exports = new userController;