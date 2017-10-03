const mongoose = require("mongoose");
const validator = require("validator");

var userSys = {};

var uid = {
    type: String,
    trim: true,
    required: true,
    minlength: 6,
    maxlength: 15,
    validate: {
        validator: function (uid) {
            return /^[A-Za-z0-9_]*$/.test(uid)
        },
        message: "Invalid character detected"
    }
};

var User = mongoose.model("User", {
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
}, "user");

var Song = mongoose.model("Song", {
    title: {
        type: String,
        trim: true
    },
    artist: {
        type: String,
        trim: true
    },
    source: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: function (src) {
                return validator.isURL(src)
            },
            message: "Invalid source url."
        }
    }
});

var Playlist = mongoose.model("Playlist", {
    uid: uid,
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 140
    },
    discription: {
        type: String
    },
    nbTitle: {
        type: Number
    }

});

var Setting = mongoose.model("Setting", {
    uid: uid,
    notification: {
        type: Boolean
    }
});

var Status = mongoose.model("Status", {
    uid: uid,
    nbTitreLike: {
        type: Number
    },
    nbPlShared: {
        type: Number
    },
    nbPlPublished: {
        type: Number
    },
    nbTitrePublished: {
        type: Number
    },
    nbLisstenedbyWeb: {
        type: Number
    },
    nbPl: {
        type: Number
    }
});

userSys.addUser = (userObj) => {
    var myuser = new User(userObj);
    console.log("1")
    return myuser.save()
};


module.exports = userSys;