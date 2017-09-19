const _ = require("lodash");
const lg = require("./lang").get("userAuth");


var userAuth = function () {
    var userAuth = {};

    userAuth.correct = function (user) {
        if(!user || !(_.isObject(user)) || !user.uid) throw lg("userInvalid");
        // uid should be at least 1 word long
        if(user.uid.length < 1) throw lg('idShort');
        // uid should only contain letter and numbers
        if(!(/^[A-Za-z0-9]+$/).test(user.uid)) throw lg('idInvalid');
        // user should possess a password longer than 6 characters
        if(!user.password || user.password.length < 6) throw lg("passwordInvalid");
        // user should confirm their password, only when registering
        if(user.passwordConfirm && user.passwordConfirm !== user.password)
            throw lg("passwordDiffers");
    };

    return userAuth;
};

module.exports = userAuth();

