const express = require("express"),
      bodyParser = require("body-parser");
var {mongoose} = require("./db");
const authenticate = require("./authenticate");
const {pick} = require("lodash");
const uuid = require("uuid");
var User = require("./user"),
    Song = require("./song"),
    Playlist = require("./playlist");

var app = express();

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
        res.json({
            msg: "user registered",
            data: pick(data, ["email", "pseudo"])
        })
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
    User.find({email}).then(data => {
        res.json(data.map(e => {
            return pick(e, ["email", "pseudo"])
        }))
    },
    err => {
        res.status(400).send(err)
    })
});

app.post("/newsong", (req, res) => {
    var song = new Song();
    const {name, artist, source, link} = req.body;
    song.sid = uuid();
    song.name = name;
    song.artist = artist;
    song.source = source;
    song.link = link;
    song.save()
        .then(data => {
            res.send(data)
        }, err => {
            res.status(400).send(err);
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
                           res.header("x-auth", token).send(user)
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



// app.post("/newplaylist", (req, res) => {
//     var pl = new Playlist();
//     const {}
// })

// app.post("/add/:pid/:sid", (req, res) => {
//     const {pid, sid} = req.params;

// });




app.listen(3001, () => {
    console.log("Test server running on 3001")
});

module.exports = {
    app
}

