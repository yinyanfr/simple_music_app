import React, { Component } from 'react';
import {connect} from "react-redux";
import api from "./../lib/api";
import store from "./../redux/configureStore";

const Header = props => {
    const onLogout = e => {
        fetch(api("logout"), {
            method: "DELETE",
            headers: new Headers({
                "x-auth": props.user.token
            })
        })
            .then(response => {
               if(response.status >= 400){
                   return Promise.reject("logout failed")
               }else {
                   sessionStorage.removeItem("token");
                   store.dispatch({
                       type: "DELETEUSER"
                   })
               }
            })
            .catch(err => {
                console.log(err)
            })
    };

    return (
        <div>
            <header>Music app, for {props.user.pseudo}</header>
            <button onClick={onLogout}>logout</button>
        </div>
    )
}

const mapStatetoProps = state => (
   {
       user: state.user
   }
)

export default connect(mapStatetoProps)(Header)
