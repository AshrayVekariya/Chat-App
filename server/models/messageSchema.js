const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        senderId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'users' },
        reciverId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'users' },
        message: { type: String, default: '', trim: true },
        isRead: { type: Boolean, default: false }
    },
    { timestamps: true }
);

const Message = mongoose.model('messages', messageSchema);

module.exports = Message;

