const bcrypt = require('bcrypt');

const User = require('../models/userSchema');

const { badRequestResponse, successResponse } = require('./../middlewares/response');
const { errorResponse } = require('./../middlewares/error');
const { notFoundResponse } = require('./../middlewares/404');
const { generateAuthToken } = require('./../middlewares/auth');

const signIn = async (req, res) => {
    try {
        const userName = req.body.username;
        const user = await User.findOne({
            $or: [
                { email: userName },
                { username: userName }
            ]
        })

        if (!user) {
            return notFoundResponse(res, { message: "Incorrect username or password!" })
        } else {
            const isMatch = await bcrypt.compare(req?.body?.password, user?.password);

            if (isMatch) {
                const token = await generateAuthToken(user);
                return successResponse(res, { token: token.token, message: "User login successfully" })
            } else {
                return badRequestResponse(res, { message: "Incorrect username or password" })
            }

        }

    } catch (error) {
        return errorResponse(res, error)
    }
}

module.exports = {
    signIn,
}