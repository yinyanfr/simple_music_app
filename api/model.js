const mongoose = require("mongoose");
const validator = require("validator");

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

var model = {};

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

model.User = mongoose.model("User", userSchema, "user");

var songSchema = new mongoose.Schema({
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

model.Song = mongoose.model("Song", songSchema, "song");

var playlistSchema = new mongoose.Schema({
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

model.Playlist = mongoose.model("Playlist", playlistSchema, "playlist");

var settingSchema = new mongoose.Schema({
    uid: uid,
    notification: {
        type: Boolean
    }
});

model.Setting = mongoose.model("Setting", settingSchema, "setting");

var statusSchema = new mongoose.Schema({
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

model.Status = mongoose.model("Status", statusSchema, "status");

module.exports = model;