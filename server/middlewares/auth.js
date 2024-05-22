const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY

const generateAuthToken = async (user) => {
    const userDetails = {}
    userDetails.id = user._id;
    userDetails.firstName = user.firstName;
    userDetails.lastName = user.lastName;
    userDetails.email = user.email;
    userDetails.profilePicture = user.profilePicture;

    const token = await jwt.sign(userDetails, secretKey)
    return { token }
}

const randomString = ({ length = 64 }) => {
    let s = '';
    Array.from({ length }).some(() => {
        s += Math.random().toString(36).slice(2);
        return s.length >= length;
    });
    return s.slice(0, length);
};

module.exports = {
    generateAuthToken,
    randomString
}