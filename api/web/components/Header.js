import React, { Component } from 'react';
import {connect} from "react-redux";
import api from "./../lib/api";
import store from "./../redux/configureStore";
import Hero from "./Hero"

class Header extends Component {

    state = {
        burger: false
    }

    onLogout = e => {
        fetch(api("logout"), {
            method: "DELETE",
            headers: new Headers({
                "x-auth": this.props.user.token
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

    onBurgerToggle = e => {
        e.preventDefault();
        this.setState(prev => (
            {
                burger: !prev.burger
            }
        ))
    }

    render(){
        return (
            <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="#">
                        <img src="./../high.png" alt="Listen, together" width="28" height="28" />
                    </a>
                    <span className="navbar-item">Music player for {this.props.user.pseudo}</span>
                    <button
                        className={this.state.burger ? "button navbar-burger is-active" : "button navbar-burger"} 
                        onClick={this.onBurgerToggle}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div 
                    className={this.state.burger ? "navbar-menu is-active" : "navbar-menu"}
                >
                    <div className="navbar-end main-burger">
                        <a className="navbar-item" href="#" onClick={this.onLogout}>logout</a>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStatetoProps = state => (
   {
       user: state.user,
       page: state.page
   }
)

export default connect(mapStatetoProps)(Header)
