import React, { Component } from 'react';
import api from "./../lib/api";
import {connect} from "react-redux";
import store from "./../redux/configureStore";
import Hero from "./Hero"
import testToken from "./../lib/testToken";
import Nav from "./Nav";

class Logopage extends Component{

    state = {
        startButton: "Welcome",
        loading: true,
        username: false
    }

    componentDidMount = e => {
        var logo = this;
        testToken().then(obj => {
            console.log(obj)
            store.dispatch({
                type: "SETUSER",
                data: obj
            })
            logo.setState(() => (
                {
                    username: obj.pseudo
                }
            ))
            logo.setState(() => (
                {
                    loading: false
                }
            ))
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
            logo.setState(() => (
                {
                    username: false
                }
            ))
            logo.setState(() => (
                {
                    loading: false
                }
            ))
        })
    }

    onStart = e => {
        e.preventDefault()
        store.dispatch({
            type: "SETPAGENAME",
            data: {
                pagename: "auth"
            }
        })
    }

    onNotYou = e =>{
        e.preventDefault()
        store.dispatch({
            type: "DELETEUSER"
        })
        this.setState(() => (
            {
                username: false
            }
        ))
        this.setState(() => (
            {
                loading: false
            }
        ))
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
                   localStorage.removeItem("token");
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
                            pagename: "auth",
                            pid: "",
                            sid: ""
                        }
                    }
               );
            })
            .catch(err => {
                console.log(err)
            })
    }

    render(){
        return (
            <div>
                <Nav>Music Player</Nav>
                <div id="logopage">
                    <Hero title="Music Player" subtitle="listen, together" />
                    <img src="./../high.png" className="logopic" />
                    {(() => {
                        if(this.state.loading){
                            return <button className="button is-primary start-button is-loading" onClick={this.onStart}>{this.state.startButton}</button>
                        }else{
                            if(this.state.username){
                                return (
                                    <div className="control logged-buttons">
                                        <button className="button is-primary start-button" onClick={this.onStart}>{`Continue as ${this.state.username}`}</button>
                                        <button className="button is-text" onClick={this.onNotYou}>Not you?</button>
                                    </div>
                                )
                            }else{
                                return (
                                    <div className="control">
                                        <button className="button is-primary start-button" onClick={this.onStart}>{`Welcome, let's get started.`}</button>
                                    </div>
                                )
                            }
                        }
                    })()}
                </div>
            </div>
        )
    }
}


const mapStatetoProps = state => (
    {
        page: state.page,
        user: state.user
    }
 )

 
export default connect(mapStatetoProps)(Logopage)
