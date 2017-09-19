const fs = require("fs");

/*
    Important: this is synchronised
 */

var lang = function () {
    var lang = {};
    lang.loadLanguage = function(language) {
        var filepaths = {
            "fr": "./langFr.json",
            "en": "./langEn.json"
        };

        return JSON.parse(fs.readFileSync(filepaths[language]))
    };

    lang.default = {};

    lang.reload = function (language) {
        lang.default = lang.loadLanguage(language)
    };

    lang.default = lang.loadLanguage("fr");

    lang.get = function (key) {
        return function (value) {
            return lang.default[key][value]
        }
    };

    return lang
};

var langObj = lang();

module.exports = langObj;