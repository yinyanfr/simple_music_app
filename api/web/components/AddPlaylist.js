import React, { Component } from 'react';
import {connect} from "react-redux";
import api from "./../lib/api";

class AddPlaylist extends Component{

    state = {
        name: ""
    }

    onBack = e => {
        this.props.dispatch({
            type: "SETPAGENAME",
            data: {
                pagename: "mylist",
            }
        })
    }

    onChangeName = e => {
        let {value} = e.target;
        this.setState(() => ({
            name: value
        }))
    };

    onSubmit = e => {
        e.preventDefault();
        const {name} = this.state;
        fetch(api("newplaylist"), {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                "x-auth": this.props.user.token
            }),
            body: JSON.stringify({
                name
            })
        })
        .then(response => {
            if(response.status >= 400) return Promise.reject("Add playlist failed");
            return response.json()
        })
        .then(obj => {
            this.props.dispatch({
                type: "UNSHIFTPLONE",
                data: obj
            })
        })
        .then(() => {
            this.props.dispatch({
                type: "SETPAGENAME",
                data: "mylist"
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){
        return (
            <div>
                <button onClick={this.onBack}>Back</button>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <input 
                            type="text" 
                            placeholder="name" 
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </div>
                    <button>Submit</button>
                </form>
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
)

export default connect(mapStatetoProps)(AddPlaylist)