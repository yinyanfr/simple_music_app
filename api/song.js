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
        trim: true
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
    },
    image: {
        type: String,
        trim: true
    }
});

songSchema.statics.addSong = function (newsong) {
    var Song = this;
    return Song.findOne({link: newsong.link})
        .then(song => {
            if(!song) return newsong.save();
            return Promise.resolve(song)
        })
        .catch(err => Promise.reject(err))
};

module.exports = mongoose.model("song", songSchema);