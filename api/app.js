const express = require("express"),
      bodyParser = require("body-parser");
const path = require("path");
var {mongoose} = require("./db");
const authenticate = require("./authenticate");
const {pick} = require("lodash");
const uuid = require("uuid");
var User = require("./user"),
    Song = require("./song"),
    Playlist = require("./playlist");

var app = express();

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS,PATCH");
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

app.use(bodyParser.json());

app.get("/api", (req, res) => {
    res.json({
        msg: "test"
    })
});

app.post("/register", (req, res) => {
    var user = new User();
    const {email, password, pseudo} = req.body;
    console.log(req.body)
    user.email = email;
    user.password = password;
    user.pseudo = pseudo;

    user.save().then(data => {
        res.send(data)
    },
    err => {
        res.status(400).send(err)
    })
});

app.get("/userlist", (req, res) => {
    User.find().then(data => {
        res.json(data.map(e => {
            return pick(e, ["email", "pseudo"])
        }))
    },
    err => {
        res.status(400).send(err)
    })
});

app.get("/searchUser/:email", (req, res) => {
    const {email} = req.params;
    User.findOne({email}).then(data => {
        if(!data) res.send({})
        else res.send(data)
    },
    err => {
        res.status(400).send(err)
    })
});

app.post("/newsong", (req, res) => {
    var song = new Song();
    const {name, artist, source, link, image} = req.body;
    song.sid = uuid();
    song.name = name;
    song.artist = artist;
    song.source = source;
    song.link = link;
    song.image = image;
    Song.addSong(song)
        .then(data => {
            res.send(data)
        }, err => {
            res.status(400).send(err)
        })
});

app.get("/song/:sid", (req, res) => {
    const {sid} = req.params;
    Song.findOne({sid})
        .then(song => {
            if(!song.link) return Promise.reject("Not Found");
            res.send(pick(song, ["sid", "name", "artist", "source", "link"]))
        })
        .catch(err => {
            res.status(404).send(err)
        })
});

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    User.findByPw(email, password)
        .then(user => {
            return user.generateAuthToken()
                       .then(token => {
                           res.header("x-auth", token).send({
                               email: user.email,
                               pseudo: user.pseudo,
                               token
                           })
                       })
        })
        .catch(err => {
            res.status(401).send(err)
        })
});

app.delete("/logout", authenticate ,(req, res) => {
    req.user.removeToken(req.token)
            .then(done => {
                res.status(200).send(done)
            }, err => {
                res.status(400).send(err)
            })
})



app.post("/newplaylist", authenticate, (req, res) => {
    var pl = new Playlist();
    const {name, isPrivate} = req.body;
    pl.pid = uuid();
    pl.creator = req.user.toObject().email;
    pl.name = name;
    pl.isPrivate = isPrivate
    pl.save().then(data => {
        res.send(data);
    }, err => {
        res.status(400).send(err)
    })
});

app.post("/pushsid", authenticate, (req, res) => {
    const {pid, sid} = req.body;
    Playlist.findOne({pid})
            .then(pl => {
                if(!pl) return Promise.reject("playlist not found");
                if(pl.creator !== req.user.toObject().email)
                    return Promise.reject("playlist authentication failed")
                return pl.addSong(sid)
            })
            .then(song => {
                res.send(song)
            })
            .catch(err => {
                console.log(err)
                res.status(401).send(err);
            })
});

app.get("/me", authenticate, (req, res) => {
    res.send(pick(req.user.toObject(), ["email", "pseudo"]))
});

app.get("/mylist", authenticate, (req, res) => {
    const {email} = req.user.toObject();
    Playlist.find({creator: email})
        .then(pls => {
            res.send(pls)
        })
})

app.delete("/deletepl", authenticate, (req, res) => {
    const {pid} = req.body;
    Playlist.findOneAndRemove({pid, creator: req.user.toObject().email})
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(400).send(err)
            })
});

const getAuth = token => {
    return new Promise((resolve, reject) => {
        User.findByToken(token)
            .then(user => {
                if(!user) reject("User not found");
                resolve(user)
            })
            .catch(err => {
                reject(err)
            })
    })
};

app.get("/songlist/:pid", (req, res) => {
    const {pid} = req.params;
    Playlist.findOne({pid})
            .then(pl => {
                if(!pl) return Promise.reject("playlist not found");
                if(pl.isPrivate){
                    let token = req.header("x-auth");
                    getAuth(token)
                        .then(user => {
                            if(user.email !== pl.creator) return Promise.reject("Authentification failed");
                            res.send(pl.songs)
                        })
                        .catch(err => {
                            res.status(401).send(err)
                        })
                }else{
                    res.send(pl.songs)
                }
            })
            .catch(err => {
                res.status(404).send(err)
            })
});

app.patch("/toggleVis", authenticate, (req, res) => {
    const {pid} = req.body;
    Playlist.findOne({pid, creator: req.user.toObject().email})
            .then(pl => {
                if(!pl) res.status(404).send("Playlist not found");
                let toggled = !pl.isPrivate;
                pl.update(
                    {$set: {isPrivate: toggled}}
                )
                  .then(data => {
                      res.send(data)
                  })
                  .catch(err => {
                      res.status(400).send(err)
                  })
            })
            .catch(err => {
                console.log(err)
                res.status(400).send(err)
            })
});

app.use(express.static(__dirname+"/web"));

app.listen(30706, () => {
    console.log("Test server running on 30706")
});

module.exports = {
    app
}

