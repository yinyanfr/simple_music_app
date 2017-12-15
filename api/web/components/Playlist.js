import React, { Component } from 'react';
import {connect} from "react-redux";
import api from "./../lib/api";
import store from "./../redux/configureStore"

class Playlist extends Component{

    state = {
        notFound: false,
        pl: []
    }

    componentDidMount(){
        if(!this.props.pid) {
            this.setState(() => ({
                notFound: true
            }))
        }
        let {pid} = this.props
        const {token} = this.props.user
        fetch(api(`pl/${pid}`), {
            method: "GET",
            headers: new Headers({
                "x-auth": token
            })
        })
            .then(response => {
                if(response.status >= 400) return Promise.reject("not found");
                return response.json()
            })
            .then(pl => {
                this.setState(() => ({
                    pl
                }))
            })
            .catch(err => {
                console.log(err);
                this.setState(() => ({
                    notFound: true
                }))
            })
    }

    onClose = e => {
        e.preventDefault()
        store.dispatch({
            type: "SETPAGEALL",
            data: {
                pagename: "mylist"
            }
        })
    }

    render(){
        return (
            <div>
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="#">
                            <img src="./../high.png" alt="Listen, together" width="28" height="28" />
                        </a>
                        <span className="navbar-item">{this.state.pl.isPrivate ? <i className="fa fa-lock" aria-hidden="true"></i> : ""}&nbsp;&nbsp;Playlist</span>
                        <button className="button navbar-burger is-active" onClick={this.onClose}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </nav>
                {(() => {
                    if(this.state.notFound){
                        return (
                            <div>Playlist not found</div>
                        )
                    }else{
                        return (
                            <div>
                                {JSON.stringify(this.state.pl)}
                            </div>
                        )
                    }
                })()}
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

 
export default connect(mapStatetoProps)(Playlist)
