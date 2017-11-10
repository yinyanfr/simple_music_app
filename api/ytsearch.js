const search = require("youtube-search");
const ytkey = "AIzaSyD591ANmEBv8bitXUwFQAzQp8oAsri4CWs";

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