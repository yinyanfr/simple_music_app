import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Main from "./Main";
import {Provider} from "react-redux";
import store from "./redux/configureStore";
import api from "./lib/api";
import testToken from "./lib/testToken";
import Push from "push.js"

import "bulma/bulma.sass"


const jsx = (
    <Provider store={store}>
        <Main />
    </Provider>
)

store.dispatch({
    type: "CHANGELANGUAGE",
    data: {
        langname: "fr"
    }
})

// Push.create("Hello world!", {
//     body: "How's it hangin'?",
//     icon: './high.png',
//     timeout: 4000,
//     onClick: function () {
//         window.focus();
//         this.close();
//     }
// });

//sessionStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlANzMwMDAuZnIiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTA5OTk4MjY1fQ.bT-MtxrN27VgFRqLyAuZ9vQ98Do0mu0_CbmIJbMQVYQ");
//sessionStorage.removeItem("token")
testToken().then(obj => {
    store.dispatch({
        type: "SETUSER",
        data: obj
    })
    return obj.token
})
.then((token) => {
    if(token){
        var pls = [];
        fetch(api("mylist"), {
            method: "GET",
            headers: new Headers({
                "x-auth": token
            })
        })
        .then(response => {
            if(response.status >= 400) return Promise.reject("Get playlists failed");
            return response.json()
        })
        .then(obj => {
            store.dispatch({
                type: "REFRESHPL",
                data: obj
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
})
.catch(err => {
    console.log(err)
    store.dispatch({
        type: "DELETEUSER"
    })
})

ReactDOM.render(jsx, document.getElementById('app'));
