const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure that usernames are unique
        trim: true,   // Trim whitespace from the beginning and end
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure that emails are unique
        lowercase: true, // Convert to lowercase
        trim: true,   // Trim whitespace from the beginning and end
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum password length
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the creation date
    },
});

// Export the User model
module.exports = mongoose.model('User', userSchema);
