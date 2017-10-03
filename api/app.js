const express = require("express");
const {SHA256} = require("crypto-js");
const mongoose = require("mongoose");
const assert = require("assert");

const model = require("./model");

mongoose.connect("mongodb://localhost:27017/zikub", {
    useMongoClient: true
});
mongoose.Promise = global.Promise;



var app = express();


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
    var schema = new mongoose.Schema({ name: 'string', size: 'string' });
    var Tank = mongoose.model('Tank', schema, "user");
    var small = new Tank({ size: 'small' });
    small.save(function (err) {
        if (err) res.status(400).send(err);
        // saved!
    })
});




app.listen(7060);

