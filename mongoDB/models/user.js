const mongoose = require("mongoose");

//Schema
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        jobTitle: {
            type: String,
            required: false,
        },
        gender: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

//Model
const User = mongoose.model("User", userSchema);

module.exports = User;