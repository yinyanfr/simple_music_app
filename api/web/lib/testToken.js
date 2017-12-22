import api from "./api";

const verify = token => {
    var headers = new Headers();
    headers.append("x-auth", token)
    //console.log(token)
    return fetch(api("me"), {
       method: "GET",
       headers
    })
    .then(response => {
        if(response.status >= 400) return Promise.reject();
        return response.json()
    })
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