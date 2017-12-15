import React, { Component } from 'react';
import {connect} from "react-redux";
import api from "./../lib/api";
import Hero from "./Hero"
import Nav from "./Nav"

class AddPlaylist extends Component{

    state = {
        name: "",
        msg: ""
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

    onChangeMsg = e => {
        let {value} = e.target
        this.setState(() => ({
            msg: value
        }))
    }

    onSubmit = e => {
        e.preventDefault();
        const {name, msg} = this.state;
        this.setState(() => (
            {
                name: "",
                msg: ""
            }
        ))
        fetch(api("newplaylist"), {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                "x-auth": this.props.user.token
            }),
            body: JSON.stringify({
                name,
                msg
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
                data: {
                    pagename: "mylist"
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){
        return (
            <div>
                <Nav>Add new playlist</Nav>
                <div className="zi-panel">
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control has-icons-right">
                            <input 
                                className={this.state.name.length > 2 ? "input is-success" : "input"} 
                                type="text" 
                                placeholder="Name of Playlist > 2"
                                value={this.state.name}
                                onChange={this.onChangeName} 
                            />
                            <span className="icon is-small is-right">
                                {this.state.name.length > 2 ? <i className="fa fa-check"></i> : ""}
                            </span>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Message</label>
                        <div className="control">
                            <textarea 
                                className="textarea" 
                                placeholder="Description"
                                value={this.state.msg}
                                onChange={this.onChangeMsg } 
                            >
                            </textarea>
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            {((valid) => {
                                if(valid){
                                    return <button className="button is-link" onClick={this.onSubmit}>Submit</button>
                                }else{
                                    return <button className="button is-link" disabled>Submit</button>
                                }
                            })(this.state.name.length > 2)}
                        </div>
                        <div className="control">
                            <button className="button is-text" onClick={this.onBack}>Cancel</button>
                        </div>
                    </div>
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
)

export default connect(mapStatetoProps)(AddPlaylist)