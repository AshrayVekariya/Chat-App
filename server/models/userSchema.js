const mongoose = require('mongoose');

const { bcryptPassword } = require('./../middlewares/bcrypt')

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, default: '', trim: true },
        lastName: { type: String, default: '', trim: true },
        email: { type: String, default: "", trim: true, unique: true },
        username: { type: String, default: "", trim: true, unique: true },
        password: { type: String, default: '' },
        profilePicture: { type: String, default: '' },
        isOnline: { type: Boolean, default: false }
    },
    { timestamps: true }
)

bcryptPassword(userSchema);

const User = mongoose.model('users', userSchema);

module.exports = User;