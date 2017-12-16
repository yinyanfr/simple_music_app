import React, { Component } from 'react';
import {connect} from "react-redux";
import api from "./../lib/api";
import store from "./../redux/configureStore"

class OnePL extends Component{

    pl = this.props.children

    state = {
        deleteModal: false
    }

    onDelete = e => {
        e.preventDefault();
        this.setState(() => (
            {
                deleteModal: false
            }
        ))
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
                });
                store.dispatch({
                    type: "SETPAGENAME",
                    data: {
                        pagename: "mylist"
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

    onOpenDelete = e => {
        e.preventDefault()
        this.setState(() => (
            {
                deleteModal: true
            }
        ))
    }

    onCloseDelete = e => {
        e.preventDefault()
        this.setState(() => (
            {
                deleteModal: false
            }
        ))
    }

    onEnter = e => {
        e.preventDefault()
        let {pid} = this.pl
        store.dispatch({
            type: "SETPAGEALL",
            data: {
                pagename: "playlist",
                pid
            }
        })
    }

    render(){
        return (
            <div className="card onepl">
                <header className="card-header">
                    <p className="card-header-title">
                        {this.pl.isPrivate ? <i className="fa fa-lock" aria-hidden="true"></i> : ""}&nbsp;&nbsp;{this.pl.name}
                    </p>
                    <a href="#" className="card-header-icon" aria-label="more options" onClick={this.onOpenDelete}>
                        <span className="icon">
                            <i className="fa fa-close" aria-hidden="true"></i>
                        </span>
                    </a>
                </header>
                <div className="card-content">
                    <div className="content">
                        {this.pl.msg || "No Description."}
                    </div>
                </div>
                <footer className="card-footer">
                    <a href="#" className="card-footer-item" onClick={this.onEnter}>Enter</a>
                </footer>
                <div className={this.state.deleteModal ? "modal is-active" : "modal"}>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Are you sure?</p>
                            <button className="delete" aria-label="close" onClick={this.onCloseDelete}></button>
                        </header>
                        <section className="modal-card-body">
                            Are you sure that you want to delete {this.pl.name}?
                            <br />
                            This operation cannot be reversed.
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-danger" onClick={this.onDelete}>Delete</button>
                            <button className="button is-text" onClick={this.onCloseDelete}>Cancel</button>
                        </footer>
                    </div>
                </div>
            </div>
            // <div>
            //     <div>{this.pl.name}</div>
            //     <button>Enter</button>
            //     <button onClick={this.onDelete}>Delete</button>
            // </div>
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