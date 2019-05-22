const search = require("youtube-search");
const ytkey = "too young too simple, sometimes naive.";

const ytsearch = keyword => {
   return new Promise((resolve, reject) => {
        search(keyword, {
            maxResults: 10,
            key: ytkey
        }, (err, result) => {
            if(err) reject(err);
            else resolve(result)
        })
   })
}

module.exports = ytsearch;
