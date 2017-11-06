import api from "./api";

const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlANzMwMDAuZnIiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTA5OTk4MjY1fQ.bT-MtxrN27VgFRqLyAuZ9vQ98Do0mu0_CbmIJbMQVYQ";

const verify = token => {
    var headers = new Headers();
    headers.append("x-auth", token)
    //console.log(token)
    return fetch(api("me"), {
       method: "GET",
       headers
    })
    .then(data => data.json())
};

export default () => (
    new Promise((resolve, reject) => {
        let token = sessionStorage.getItem("token") || localStorage.getItem("token");
        console.log(token);
        if(token){
            verify(token)
                .then(obj => {
                    resolve({...obj, token})
                })
                .catch(err => {
                    reject(err)
                })
        }
        else reject("not found")
    })
)