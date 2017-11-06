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
    isPrivate:{
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
    return Song.findOne({sid}).then(song => {
        if(!song) return Promise.reject("invalide songid");
        playlist.songs.push({sid: song.sid});
        // should a playlist include identique songs?
        // playlist.songs = uniq(playlist.songs);
        return playlist.save().then(() => {
            return song
        })
    })
};

playlistSchema.methods.removeSong = function (sid) {
    var playlist = this;
    return 
}

module.exports = mongoose.model("playlist", playlistSchema);