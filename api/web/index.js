import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Main from "./Main";
import {Provider} from "react-redux";
import store from "./redux/configureStore";
import api from "./lib/api";
import Push from "push.js"

import "bulma/bulma.sass"
import "./scss/style.scss"


const jsx = (
    <Provider store={store}>
        <Main />
    </Provider>
)


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

ReactDOM.render(jsx, document.getElementById('app'));
