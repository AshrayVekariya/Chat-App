const mongoose = require('mongoose')

const User = require('../models/userSchema');

const { badRequestResponse, successResponse } = require('./../middlewares/response');
const { errorResponse } = require('./../middlewares/error');
const { notFoundResponse } = require('./../middlewares/404');

const createUser = async (req, res) => {
    try {
        const body = req?.body;

        const createNewUser = await User.create(body);

        if (createNewUser) {
            return successResponse(res, { message: "User created successfully." });
        } else {
            return badRequestResponse(res, { message: "Something went wrong!" });
        }
    } catch (error) {
        return errorResponse(res, error);
    }
}

const getAllUser = async (req, res) => {
    try {
        const { userId } = req?.body;
        const allUsers = await User.aggregate([
            {
                $match: {
                    _id: {
                        $ne: new mongoose.Types.ObjectId(userId)
                    }
                }
            },
            {
                $lookup: {
                    from: "messages",
                    let: {
                        user: "$_id"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $or: [
                                        {
                                            $and: [
                                                { $eq: ["$senderId", new mongoose.Types.ObjectId(userId)] },
                                                { $eq: ["$reciverId", "$$user"] }
                                            ]
                                        },
                                        {
                                            $and: [
                                                { $eq: ["$reciverId", new mongoose.Types.ObjectId(userId)] },
                                                { $eq: ["$senderId", "$$user"] }
                                            ]
                                        },
                                    ]
                                }
                            }
                        },
                        {
                            $sort: {
                                createdAt: -1
                            }
                        }
                    ],
                    as: "lastMessage"
                }
            },
            {
                $addFields: {
                    lastMessage: {
                        $first: "$lastMessage"
                    }
                }
            },
            {
                $project: {
                    __v: 0,
                    createdAt: 0,
                    updatedAt: 0
                }
            }
        ]);

        return successResponse(res, { data: allUsers });

    } catch (error) {
        return errorResponse(res, error);
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id
        const getSingleUser = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $project: {
                    password: 0,
                    __v: 0,
                    createdAt: 0,
                    updatedAt: 0
                }
            }
        ])
        if (getSingleUser) {
            return successResponse(res, { data: getSingleUser })
        } else {
            return badRequestResponse(res, { message: "User not found!" })
        }
    } catch (error) {
        return errorResponse(res, error);
    }
}

const updateUserById = async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;

        if (body) {
            req.body.profilePicture = req?.file ? req?.file?.path : null
        }

        if (id) {
            const updateUser = await User.findOneAndUpdate({ _id: id }, body);
            if (updateUser) {
                return successResponse(res, { message: "User update successfully" })
            } else {
                return badRequestResponse(res, { message: "Something went wrong!" })
            }
        } else {
            return notFoundResponse(res, { message: 'User not found!' })
        }
    } catch (error) {
        return errorResponse(res, error);
    }
}

const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            const deleteUser = await User.findOneAndDelete({ _id: id });
            if (deleteUser) {
                return successResponse(res, { message: "User delete successfully" })
            } else {
                return badRequestResponse(res, { message: "Something went wrong!" })
            }
        } else {
            return notFoundResponse(res, { message: 'User not found!' })
        }
    } catch (error) {
        return errorResponse(res, error);
    }
}

module.exports = {
    createUser,
    getAllUser,
    getUserById,
    updateUserById,
    deleteUserById
}