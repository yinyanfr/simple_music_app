const dbZikub = require("./dbZikub");

var task = dbZikub.connectPromised();

task.then(function (db) {
    console.log("success")
})