const mongoose = require('mongoose');

const Message = require('../models/messageSchema');

const { badRequestResponse, successResponse } = require('./../middlewares/response');
const { errorResponse } = require('./../middlewares/error');

const sendMessages = async (req, res) => {
    try {
        const body = req?.body;

        const createMessage = await Message.create(body);

        if (createMessage) {
            return successResponse(res, { message: "Message created successfully." });
        } else {
            return badRequestResponse(res, { message: "Somethin went wrong!" });
        }

    } catch (error) {
        return errorResponse(res, error);
    }
}

const getMessage = async (req, res) => {
    try {

        const { senderId, reciverId } = req?.body;

        const getAllMessage = await Message.aggregate([
            {
                $match: {
                    $or: [{
                        senderId: new mongoose.Types.ObjectId(senderId),
                        reciverId: new mongoose.Types.ObjectId(reciverId)
                    }, {
                        reciverId: new mongoose.Types.ObjectId(senderId),
                        senderId: new mongoose.Types.ObjectId(reciverId)
                    }]
                }
            },
            {
                $sort: {
                    createdAt: 1
                }
            },
            {
                $project: {
                    __v: 0
                }
            }
        ]);

        return successResponse(res, { data: getAllMessage });
    } catch (error) {
        return errorResponse(res, error);
    }
}

const getNotRedableMessage = async (req, res) => {
    try {
        const body = req?.body;
        const notRedaMessage = await Message.aggregate([
            {
                $match: {
                    reciverId: new mongoose.Types.ObjectId(body?.reciverId),
                    isRead: false
                }
            }
        ])

        if (body) {
            return successResponse(res, { data: notRedaMessage });
        } else {
            return badRequestResponse(res, { message: "Something went wrong!" });
        }

    } catch (error) {
        return errorResponse(res, error)
    }
}

const readAllmessage = async (req, res) => {
    try {
        const body = req?.body;

        const updateMessage = await Message.updateMany(
            {
                $and: [
                    { reciverId: new mongoose.Types.ObjectId(body?.reciverId) },
                    { senderId: new mongoose.Types.ObjectId(body?.senderId) },
                ]
            },
            {
                $set: {
                    isRead: true
                }
            }
        )

        if (updateMessage) {
            return successResponse(res, { message: "Message has been successfully read" })
        } else {
            return badRequestResponse(res, { message: "Something want wrong!" })
        }

    } catch (error) {
        return errorResponse(res, error)
    }
}

module.exports = {
    sendMessages,
    getMessage,
    getNotRedableMessage,
    readAllmessage
}