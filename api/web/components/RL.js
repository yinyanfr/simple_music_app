import React, { Component } from 'react';
import Register from "./Register";
import Login from "./Login";
import Hero from "./Hero";
import Nav from "./Nav";

class RL extends Component{
    state = {
        register: false
    };

    onToggle = () => {
        this.setState((prev) => ({register: !prev.register}))
    }

    onRegister = e => {
        e.preventDefault()
        this.setState(() => (
            {
                register: true
            }
        ))
    }

    onLogin = e => {
        e.preventDefault()
        this.setState(() => (
            {
                register: false
            }
        ))
    }

    render(){
        return (
            <div id="rl">
                <Nav>Register and Login</Nav>
                <div className="tabs">
                    <ul>
                        <li 
                            className={this.state.register ? "" : "is-active"} 
                            onClick={this.onLogin}
                        >
                            <a>Login</a>
                        </li>
                        <li 
                            className={this.state.register ? "is-active" : ""}
                            onClick={this.onRegister}
                        >
                            <a>Register</a>
                        </li>
                    </ul>
                </div>
                <div className="zi-panel">{this.state.register ? <Register /> : <Login />}</div>
            </div>
        )
    }
}

export default RL;
