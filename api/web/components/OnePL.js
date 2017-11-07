import React, { Component } from 'react';
import {connect} from "react-redux";
import api from "./../lib/api";

class OnePL extends Component{

    pl = this.props.children

    onDelete = e => {
        e.preventDefault();
        fetch(api("deletepl"), {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                "x-auth": this.props.user.token
            }),
            body: JSON.stringify({
                pid: this.pl.pid
            })
        })
        .then(response => {
            if(response.status >= 400) return Promise.reject("Delete playlist failed");
            return response.json()
        })
        .then(obj => {
            fetch(api("mylist"), {
                method: "GET",
                headers: new Headers({
                    "x-auth": this.props.user.token
                })
            })
            .then(response => {
                if(response.status >= 400) return Promise.reject("Get playlist failed");
                return response.json()
            })
            .then(obj => {
                this.props.dispatch({
                    type: "REFRESHPL",
                    data: obj
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

    render(){
        return (
            <div>
                <div>{this.pl.name}</div>
                <button>Enter</button>
                <button onClick={this.onDelete}>Delete</button>
            </div>
        )
    }
}

const mapStatetpProps = state => (
    {
        user: state.user,
        pl: state.pl
    }
)


export default connect(mapStatetpProps)(OnePL)