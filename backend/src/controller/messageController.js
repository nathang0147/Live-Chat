const Message = require('../models/messageModel');


class MessageController {
    async send(req, res){
        const {sender, receiver, message} = req.body;
        try{
            const newMessage = await Message.create({sender, receiver, message});
            res.status(201).json(newMessage);
        }catch (e){
            res.status(400).json({error: e.message});
        }
    }



}

module.exports = new MessageController();