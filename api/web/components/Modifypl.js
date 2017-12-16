import React, { Component } from 'react';
import {connect} from "react-redux";
import api from "./../lib/api";
import Hero from "./Hero"
import Nav from "./Nav"
import moment from "moment"

class Modifypl extends Component{

    state = {
        name: "",
        msg: "",
        privateChecked: false
    }

    componentDidMount(){
        
    }

    onTmp = e => {
        fetch(api("modifypl"), {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                "x-auth": token
            }),
            body: JSON.stringify({
                creator: email,
                name,
                msg,
                isPrivate: privateChecked,
                createdAt: moment().format()
            })
        })
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
        const {name, msg, privateChecked} = this.state;
        const {token, email} = this.props.user
        console.log(token, email)
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
                "x-auth": token
            }),
            body: JSON.stringify({
                creator: email,
                name,
                msg,
                isPrivate: privateChecked,
                createdAt: moment().format()
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

    onCheckPrivate = e => {
        this.setState(prev => ({
            privateChecked: !prev.privateChecked
        }))
    }

    render(){
        return (
            <div>
                <div>
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
                                onChange={this.onChangeMsg} 
                            >
                            </textarea>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <label className="checkbox">
                                <input type="checkbox" checked={this.state.privateChecked} onClick={this.onCheckPrivate} />
                                &nbsp;&nbsp;make this playlist private
                            </label>
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

export default connect(mapStatetoProps)(Modifypl)
