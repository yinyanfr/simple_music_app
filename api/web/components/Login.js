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
        this.state.email = ""
        this.state.password = ""
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

    onCancel = e => {
        e.preventDefault()
        store.dispatch({
            type: "SETPAGENAME",
            data: {
                pagename: "logo"
            }
        })
    }

    render(){
        return (
            <div>
                <form onSubmit={this.state.submitActive? this.onSubmit : this.doNothing}>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control has-icons-left has-icons-right">
                            <input
                                className={((valid) => {
                                    if(valid === 0) return "input is-danger"
                                    if(valid) return "input is-success"
                                    return "input"
                                })(this.state.emailValid)}
                                type="text" 
                                placeholder="email" 
                                value={this.state.email}
                                onChange={this.onChangeInput("email")}
                            />
                            <span className="icon is-small is-left">
                                <i className="fa fa-envelope"></i>
                            </span>
                            <span className="icon is-small is-right">
                                {((valid) => {
                                    if(valid === 0) return <i className="fa fa-warning"></i>
                                    if(valid) return <i className="fa fa-check"></i>
                                    return ""
                                })(this.state.emailValid)}
                            </span>
                            {this.state.emailValid === 0 ? <p className="help is-danger">This email is invalid</p> : ""}
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control has-icons-left has-icons-right">
                            <input 
                                className={this.state.passwordValid? "input is-success" : "input"}
                                type="password" 
                                placeholder="password > 6" 
                                value={this.state.password}
                                onChange={this.onChangeInput("password")}
                            />
                            <span className="icon is-small is-left">
                                <i className="fa fa-key"></i>
                            </span>
                            <span className="icon is-small is-right">
                                {this.state.passwordValid ? <i className="fa fa-check"></i> : ""}
                            </span>
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                        {(() => {
                            if((!!this.state.emailValid) && this.state.passwordValid)
                            return (<button className="button is-link">Submit</button>);
                            return <button className="button is-link" disabled>Submit</button>
                        })()}
                        </div>
                        <div className="control" onClick={this.onCancel}>
                            <button className="button is-text">Cancel</button>
                        </div>
                    </div>
                    <div>{this.state.loginFail? "Password is wrong" : ""}</div>
                </form>
            </div>
        )
    }
}