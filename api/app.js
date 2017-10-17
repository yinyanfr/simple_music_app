const express = require("express");
const {SHA256} = require("crypto-js");
const mongoose = require("mongoose");
const assert = require("assert");
const request = require("request-promise-native");

const model = require("./model");

mongoose.connect("mongodb://localhost:27017/zikub", {
    useMongoClient: true
});
mongoose.Promise = global.Promise;



var app = express();

app.use(express.static("./../ui/build"));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/register/:id/:pw/:email", (req, res) => {
    var userObj = {
        id: req.params.id,
        password: SHA256(req.params.pw).toString(),
        email: req.params.email
    };

    console.log(userObj);

    var myuser = new model.User(userObj);

    myuser.save().then(result => res.send(result), err => res.status(400).send(err))

});

app.get("/test", (req, res) => {
    request("http://node.73000.fr/dev/randomProfile/10")
        .then(result => res.send(result), err => res.status(400).send(err))
});




app.listen(7060);
