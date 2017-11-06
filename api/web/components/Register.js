import React, { Component } from 'react';
import {isEmail} from "validator";
import api from "./../lib/api";
import store from "./../redux/configureStore";

export default class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            pseudo: "",
            emailValid: false,
            passwordValid: false,
            pseudoValid: false,
            submitActive: true
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
                                if(result.email) this.setState(() => ({emailValid: 0}));
                                else this.setState(() => ({emailValid: true}));
                            })
                    }
                    break;
                case "password":
                    this.setState(() => ({passwordValid: !!(value.length >= 6)}));
                    break;
                case "pseudo":
                    this.setState(() => ({pseudoValid: !!(value.length >= 4)}));
                    break;
                default:
                    break;
            }
        }
    };

    onSubmit = e => {
        e.preventDefault();
        this.setState(() => ({submitActive: false}))
        let {email, password, pseudo} = this.state;
        let body = {email, password, pseudo};
        console.log(body)
        fetch(api("register"), {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(body)
        }).then(response => {
           if(response.status >= 400){
               return Promise.reject("Register Fail")
           }else return response.json()
        })
        .then(obj => {
            fetch(api("login"), {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({email, password})
            })
            .then(response => {
                // THERE after first login
                if(response.status >= 400){
                    return Promise.reject("Login Fail")
                }else {
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
        })
        .catch(err => {
            console.log(err)
        })
    }

    doNothing = e => {
        console.log("Do nothing")
    }

    render(){
        return (
            <div>
                <h3>Register</h3>
                <form onSubmit={this.state.submitActive? this.onSubmit : this.doNothing}>
                    <div>
                        <input 
                            type="text" 
                            placeholder="email" 
                            value={this.state.email}
                            onChange={this.onChangeInput("email")}
                        />
                        <span>{(() => {
                            if(this.state.emailValid === 0) return "Existed!";
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
                        <span>{this.state.passwordValid? "ok" : ""}</span>
                    </div>
                    <div>
                        <input 
                            type="text" 
                            placeholder="pseudo > 4" 
                            value={this.state.pseudo}
                            onChange={this.onChangeInput("pseudo")}
                        />
                        <span>{this.state.pseudoValid? "ok" : ""}</span>
                    </div>
                    <div>
                        {
                            ((!!this.state.emailValid) && this.state.passwordValid && this.state.pseudoValid)
                            &&
                            (<button>Submit</button>)
                        }
                    </div>
                </form>
            </div>
        )
    }
}