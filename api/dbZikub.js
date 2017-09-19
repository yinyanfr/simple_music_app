var MongoClient = require("mongodb").MongoClient;
const lg = require("./lang").get("dbZikub");

var dbZikub = function (url) {
    var dbZikub = {};
    dbZikub.connect = function (callback) {
        MongoClient.connect(url, function (err, db) {
            if(err) throw err;
            console.log(lg("connectSuccess"), url);
            callback(db);
        })
    };

    dbZikub.connectPromised = function () {
        return new Promise(function (resolve, reject) {
            MongoClient.connect(url, function (err, db) {
                if(err) reject(err);
                resolve(db);
            })
        })
    };
    
    dbZikub.insertData = function (data, callback) {
        MongoClient.insertOne(data, function (err, result) {
            if(err) throw err;
            console.log(lg("insertSuccess"));
            callback(result)
        })
    };

    dbZikub.insertDataPromised = function (data) {
        return new Promise(function (resolve, reject) {
            MongoClient.insertOne(data, function (err, result) {
                if(err) reject(err);
                resolve(result)
            })
        })
    };





    return dbZikub
};

module.exports = dbZikub("mongodb://localhost:27017/zikub");