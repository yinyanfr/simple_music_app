var mongoose = require("mongoose");
const {isEmail, isHash} = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate:{
            isAsync: true,
            validator: isEmail,
            message: "{VALUE} is not a valid email address"
        }
    },
    password: {
        type: String,
        required: true
    },
    pseudo: {
        type: String,
        minlength: 4,
        required: true
    },
    tokens: [
        {
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }
    ]
});

userSchema.pre("save", function (next) {
    var user = this;
    if(user.isModified("password")){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) console.log(err);
                user.password = hash;
                next()
            })
        })
    }else{
        next()
    }
});

userSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = "auth";

}


module.exports = mongoose.model("User", userSchema);
