var mongoose = require("mongoose");

var songSchema = new mongoose.Schema({
    sid:{
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    name:{
        type: String,
        trim: true,
        required: true,
        minlength: 1
    },
    artist:{
        type: String,
        trim: true,
        minlength: 1
    },
    source:{
        type: String,
        trim: true,
        required: true,
        minlength: 1
    },
    link:{
        type: String,
        trim: true,
        required: true,
        unique: true,
        minlength: 1
    }
});

module.exports = mongoose.model("song", songSchema);