var mongoose = require("mongoose");
const {isEmail, isHash} = require("validator");
const {pick} = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = "tempsalt";

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

userSchema.methods.toJSON = function () {
    var user = this;
    var userObj = user.toObject();

    return pick(userObj, ["email", "pseudo"])
}

userSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = "auth";
    var token = jwt.sign({email: user.email, access}, salt).toString();
    
    user.tokens.push({access, token});

    return user.save().then(() => {
        return token
    })
};

userSchema.methods.removeToken = function (token) {
    var user = this;
    return user.update({
        $pull:{
            tokens: {token}
        }
    })
};

userSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try{
        decoded = jwt.verify(token, salt)
    }catch(e){
        return Promise.reject(e)
    }

    return User.findOne({email: decoded.email})
};

userSchema.statics.findByPw = function (email, password) {
    var User = this;

    return User.findOne({email})
               .then(user => {
                   if(!user) return Promise.reject("User not found")

                   return new Promise((resolve, reject) => {
                       bcrypt.compare(password, user.password, (err, res) => {
                           if(res) resolve(user);
                           else reject("Password incorrect")
                       })
                   })
               })
}

module.exports = mongoose.model("User", userSchema);
