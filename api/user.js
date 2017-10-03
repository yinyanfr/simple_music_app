const mongoose = require("mongoose");
const validator = require("validator");

var userSchema = new mongoose.Schema({
    id: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 15,
        validate: {
            validator: function (uid) {
                return /^[A-Za-z0-9_]*$/.test(uid)
            },
            message: "Invalid character detected"
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: function (pw) {
                return validator.isHash(pw, "sha256")
            },
            message: "Password is not encrypted!"
        }
    },
    email: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: function (em) {
                return validator.isEmail(em)
            },
            message: "Invalid Email Address"
        }
    }
});

var User = mongoose.model("User", userSchema, "user");

module.exports = User;