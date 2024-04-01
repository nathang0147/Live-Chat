const Message = require('../models/messageModel');
const Conversation = require('../models/conversationModel');


class MessageController {
    async sendMessage(req, res){
        try {
            const {message} = req.body;
            const {id : receiverId} = req.params;
            const senderId = req.user._id;

            // console.log("Sender ID: ", senderId);
            // console.log("Receiver ID: ", receiverId);

            let conversation = await Conversation.findOne({
                participants: {$all: [senderId, receiverId]}
            })

            if (!conversation){
                conversation = await Conversation.create({
                    participants: [senderId, receiverId]
                })
            }

            const newMessage = new Message({
                senderID : senderId,
                receiverID : receiverId,
                message,
            });

            if (newMessage){
                conversation.messages.push(newMessage._id);
            }


            //SOCKET IO will be implemented here

            //this will run in parallel
            await Promise.all([conversation.save(), newMessage.save()]);

            res.status(200).json(newMessage);

        }catch (e){
            console.error("Error when sending message: ",e.message);
            return res.status(500).json({message: 'Internal server error'});
        }
    }

    async getMessage(req, res){

        try{
            const {id : useToChatId} = req.params;
            const senderId = req.user._id;

            let conversation = await Conversation.findOne({
                participants: {$all: [senderId, useToChatId]}
            }).populate('messages'); //=> return the array message object thourgh the message id, NOT REFERRENCE BUT ACTUAL MESSAGE OBJECT

            if(!conversation){
                return res.status(200).json([]);
            }

            const messages = conversation.messages;

            res.status(200).json(messages);

        }catch (e){
            console.error("Error when getting message: ",e.message);
            return res.status(500).json({message: 'Internal server error'});
        }
    }

}

module.exports = new MessageController();