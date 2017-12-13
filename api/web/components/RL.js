import React, { Component } from 'react';
import Register from "./Register";
import Login from "./Login";

class RL extends Component{
    state = {
        register: true
    };

    onToggle = () => {
        this.setState((prev) => ({register: !prev.register}))
    }

    render(){
        return (
            <div>
                <div>Register and login</div>
                <button className="button is-text" onClick={this.onToggle}>Toggle</button>
                <div>{this.state.register ? <Register /> : <Login />}</div>
            </div>
        )
    }
}

export default RL;
