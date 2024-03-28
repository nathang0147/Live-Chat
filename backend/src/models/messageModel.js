const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    receiverID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    message: {
        type: String,
        required: true
    },
}, {timestamps: true});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;