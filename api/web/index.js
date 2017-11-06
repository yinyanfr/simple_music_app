import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Main from "./Main";
import {Provider} from "react-redux";
import store from "./redux/configureStore";
import api from "./lib/api";
import testToken from "./lib/testToken";


const jsx = (
    <Provider store={store}>
        <Main />
    </Provider>
)

//sessionStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlANzMwMDAuZnIiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTA5OTk4MjY1fQ.bT-MtxrN27VgFRqLyAuZ9vQ98Do0mu0_CbmIJbMQVYQ");
//sessionStorage.removeItem("token")
testToken().then(obj => {
    store.dispatch({
        type: "SETUSER",
        data: obj
    })
}).catch(err => {
    store.dispatch({
        type: "DELETEUSER"
    })
})

ReactDOM.render(jsx, document.getElementById('app'));
