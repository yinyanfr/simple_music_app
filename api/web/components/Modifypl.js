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
        privateChecked: false,
        canSubmit: false,
        notion: false,
        warningon: false
    }

    componentDidMount(){
        fetch(api(`pl/${this.props.onepl.pid}`), {
            method: "GET",
            headers: new Headers({
                "x-auth": this.props.user.token
            })
        })
            .then(response => {
                if(response.status >= 400) return Promise.reject();
                return response.json()
            })
            .then(pl => {
                const {name, msg, isPrivate} = pl
                this.setState(() => ({
                    name,
                    msg,
                    privateChecked: isPrivate,
                    canSubmit: true
                }))
            })
            .catch(err => {
                console.log(err)
                this.setState(() => ({
                    canSubmit: false
                }))
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
        fetch(api("modifypl"), {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                "x-auth": token
            }),
            body: JSON.stringify({
                pid: this.props.onepl.pid,
                name,
                msg,
                isPrivate: privateChecked
            })
        })
        .then(response => {
            if(response.status >= 400) return Promise.reject("Add playlist failed");
            return response.json()
        })
        .then(() => {
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
                });
                this.setState(() => ({
                    notion: true
                }))
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
            this.setState(() => ({
                warningon: true
            }))
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
                    {this.state.notion ? <div className="notification is-primary">Success</div> : ""}
                    {this.state.warningon ? <div className="notification is-danger">Failed</div> : ""}
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
                            })(this.state.name.length > 2 && this.state.canSubmit)}
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
