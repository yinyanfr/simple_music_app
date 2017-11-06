var User = require("./user");

var authenticate = (req, res, next) => {
    var token = req.header("x-auth");
    User.findByToken(token)
        .then(user => {
            if(!user) return Promise.reject("User not found");
            req.user = user;
            req.token = token;
            next();
        })
        .catch(err => {
            res.status(401).send("Authentification failed")
        })
};

module.exports = authenticate;
