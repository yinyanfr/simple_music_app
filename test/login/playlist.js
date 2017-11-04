var mongoose = require("mongoose");
const Song = require("./song");
const {uniq} = require("lodash");

var playlistSchema = new mongoose.Schema({
    creator:{
        type: String,
        require: true
    },
    name:{
        type: String,
        trim: true,
        required: true,
        minlength: 2
    },
    pid:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    isPublic:{
        type: Boolean,
        default: false
    },
    songs:[
        {
            sid:{
                type: String,
                required: true
            }
        }
    ]
});

playlistSchema.methods.addSong = function (sid) {
    var playlist = this;
    return Song.find({sid}).then(songs => {
        if(songs.length < 1) return Promise.reject("invalide songid");
        playlist.songs.push({sid: songs[0].sid});
        // should a playlist include identique songs?
        // playlist.songs = uniq(playlist.songs);
        return playlist.save().then(() => {
            return songs[0]
        })
    })
};

playlistSchema.methods.removeSong = function (sid) {
    var playlist = this;
    return 
}

module.exports = mongoose.model("playlist", playlistSchema);
