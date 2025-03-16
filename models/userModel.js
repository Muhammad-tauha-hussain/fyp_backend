const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // Removes extra spaces
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true // Ensures emails are stored in lowercase
    },
    password: {
        type: String,
        required: function() {
            return !this.googleId; 
        }
    },
    googleId: {
        type: String,
        unique: true, // Prevents duplicate Google users
        sparse: true // Ensures uniqueness only when googleId exists
    },
    resetToken: String,
    resetTokenExpiration: Date
}, { timestamps: true }); // Adds createdAt & updatedAt fields

const UserModel = mongoose.model('estateuser', userSchema);
module.exports = UserModel;
