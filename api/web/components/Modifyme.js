import React, { Component } from 'react'
import {connect} from "react-redux";
import api from "./../lib/api";
import store from "./../redux/configureStore";

class Modifyme extends Component{

    state = {
        password: "",
        pseudo: "",
        passwordValid: false,
        pseudoValid: false,
        submitActive: true
    }

    componentDidMount(){
        this.setState(() => ({
            pseudo: this.props.user.pseudo
        }))
    }

    onChangeInput = name => {
        var self = this;
        return e => {
            let {value} = e.target;
            let o = {};
            o[name] = value
            self.setState(() => (o))
            switch (name) {
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

    doNothing = e => {
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
    
    onClose = e => {
        e.preventDefault()
        let {prev} = this.props.page
        store.dispatch({
            type: "SETPAGENAME",
            data: {
                pagename: prev || "mylist"
            }
        })
    }

    render(){

        return (
            <div>
                <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="#" onClick={this.onClose}>
                            <i className="fa fa-chevron-left" aria-hidden="true" width="28" height="28"></i>
                        </a>
                        <span className="navbar-item">Account Settings</span>
                    </div>
                </nav>

                <div className="zi-panel margin-top-ten">
                    <p>You can change your pseudo and password, leave password empty if you don't want to change it.</p>
                    <form onSubmit={this.state.submitActive? this.onSubmit : this.doNothing}>
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
                        <div className="field">
                            <label className="label">Username</label>
                            <div className="control has-icons-left has-icons-right">
                                <input 
                                    className={((valid) => valid ? "input is-success" : "input")(this.state.pseudoValid)}
                                    type="text" 
                                    placeholder="pseudo > 4" 
                                    value={this.state.pseudo}
                                    onChange={this.onChangeInput("pseudo")}
                                />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-user"></i>
                                </span>
                                <span className="icon is-small is-right">
                                    {this.state.pseudoValid ? <i className="fa fa-check"></i> : ""}
                                </span>
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                            {(() => {
                                if(this.state.passwordValid && this.state.pseudoValid)
                                return (<button className="button is-link">Submit</button>);
                                return <button className="button is-link" disabled>Submit</button>
                            })()}
                            </div>
                            <div className="control" onClick={this.onCancel}>
                                <button className="button is-text">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStatetoProps = state => (
    {
        user: state.user,
        page: state.page,
        pl: state.pl
    }
 );

 
export default connect(mapStatetoProps)(Modifyme)
