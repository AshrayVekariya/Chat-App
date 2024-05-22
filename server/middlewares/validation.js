const Joi = require('joi');
const { badRequestResponse } = require('./response');

// User - joi Validation Middleware 
const userValidation = async (req, res, next) => {
    const payload = {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email,
        username: req?.body?.username,
        password: req?.body?.password
    };

    const validation = Joi.object({
        firstName: Joi.string().trim(true).required(),
        lastName: Joi.string().trim(true).required(),
        email: Joi.string().email().trim(true).required(),
        username: Joi.string().trim(true).required(),
        password: Joi.string().trim(true).required()
    })

    const { error } = validation.validate(payload);
    if (error) {
        return badRequestResponse(res, { message: error.message })
    } else {
        next();
    }
};

const messageValidation = async (req, res, next) => {
    const payload = {
        senderId: req?.body?.senderId,
        reciverId: req?.body?.reciverId,
        message: req?.body?.message
    };

    const validation = Joi.object({
        senderId: Joi.string().trim(true).required(),
        reciverId: Joi.string().trim(true).required(),
        message: Joi.string().trim(true).required(),
    })

    const { error } = validation.validate(payload);
    if (error) {
        return badRequestResponse(res, { message: error.message })
    } else {
        next();
    }
};

module.exports = { userValidation, messageValidation };