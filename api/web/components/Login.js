import React, { Component } from 'react';
import {isEmail} from "validator";
import api from "./../lib/api";
import store from "./../redux/configureStore";

export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            emailValid: false,
            passwordValid: false,
            submitActive: true,
            loginFail: false
        }
    }

    testEmailExistence = email => {
        return fetch(api(`searchUser/${email}`), {
            mode: "GET"
        }).then(data => data.json())
    }

    onChangeInput = name => {
        var self = this;
        return e => {
            let {value} = e.target;
            let o = {};
            o[name] = value
            self.setState(() => (o))
            switch (name) {
                case "email":
                    let format = isEmail(value);
                    if(!format) this.setState(() => ({emailValid: false}));
                    else {
                        this.testEmailExistence(value)
                            .then(result => {
                                console.log(result)
                                if(result.email) this.setState(() => ({emailValid: true}));
                                else this.setState(() => ({emailValid: 0}));
                            })
                    }
                    break;
                case "password":
                    this.setState(() => ({submitActive: true}));
                    this.setState(() => ({loginFail: false}));
                    this.setState(() => ({passwordValid: !!(value.length >= 6)}));
                    break;
                default:
                    break;
            }
        }
    };

    onSubmit = e => {
        e.preventDefault();
        this.setState(() => ({submitActive: false}))
        let {email, password} = this.state;
        let body = {email, password};
        fetch(api("login"), {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({email, password})
        })
        .then(response => {
            // THERE after login
            if(response.status >= 400){
                this.setState(() => ({loginFail: true}));
                return Promise.reject("Login Fail")
            }else {
                this.setState(() => ({loginFail: false}));
                return response.json()
            }
        })
        .then(obj => {
            console.log(obj);
            sessionStorage.setItem("token", obj.token);
            store.dispatch({
                type: "SETUSER",
                data: {
                    email: obj.email,
                    pseudo: obj.pseudo,
                    token: obj.token
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    doNothing = e => {
        e.preventDefault();
        console.log("Do nothing")
    }

    render(){
        return (
            <div>
                <h3>Login</h3>
                <form onSubmit={this.state.submitActive? this.onSubmit : this.doNothing}>
                    <div>
                        <input 
                            type="text" 
                            placeholder="email" 
                            value={this.state.email}
                            onChange={this.onChangeInput("email")}
                        />
                        <span>{(() => {
                            if(this.state.emailValid === 0) return "User isn't existing";
                            else if(this.state.emailValid === true) return "ok";
                            else return ""
                        })()}</span>
                    </div>
                    <div>
                        <input 
                            type="password" 
                            placeholder="password > 6" 
                            value={this.state.password}
                            onChange={this.onChangeInput("password")}
                        />
                        <span>{this.state.passwordValid? "" : ""}</span>
                    </div>
                    <div>
                        {
                            ((!!this.state.emailValid) && this.state.passwordValid)
                            &&
                            (<button>Login</button>)
                        }
                    </div>
                    <div>{this.state.loginFail? "Password is wrong" : ""}</div>
                </form>
            </div>
        )
    }
}