import React, { Component } from 'react';
import {connect} from "react-redux";
import api from "./../lib/api";
import store from "./../redux/configureStore";
import Hero from "./Hero"

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
                   store.dispatch(
                        {
                            type: "DELETEUSER"
                        }
                   );
               }
            })
            .then(() => {
                store.dispatch(
                    {
                        type: "SETPAGEALL",
                        data: {
                            pagename: "logopage",
                            pid: "",
                            sid: ""
                        }
                    }
               );
            })
            .catch(err => {
                console.log(err)
            })
    };

    return (
        // <div>
        //     <Hero>Music app, for {props.user.pseudo}</Hero>
        //     <button onClick={onLogout}>logout</button>
        // </div>

        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="#">
                    <img src="./../high.png" alt="Listen, together" width="28" height="28" />
                </a>
                <button className="button navbar-burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    )
}

const mapStatetoProps = state => (
   {
       user: state.user,
       page: state.page
   }
)

export default connect(mapStatetoProps)(Header)
