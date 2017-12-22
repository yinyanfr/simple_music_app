import React, { Component } from 'react';
import {connect} from "react-redux";
import api from "./../lib/api";
import store from "./../redux/configureStore"
import Songlist from "./Songlist"
import Detail from "./Detail"
import Modifypl from "./Modifypl"

class Playlist extends Component{

    state = {
        notFound: false,
        pl: {},
        innerpage: "",
        forked: false
    }

    componentDidMount(){
        if(!this.props.page.pid) {
            this.setState(() => ({
                notFound: true
            }))
        }
        let {pid} = this.props.page
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
                    innerpage: "songs",
                    pl
                }))
                store.dispatch({
                    type: "CHANGEPLAYLIST",
                    data: {
                        playlist: pl
                    }
                })
            })
            .catch(err => {
                console.log(err);
                this.setState(() => ({
                    notFound: true
                }))
            })

            fetch(api(`pllistened/${pid}`), {
                method: "PATCH"
            }).then(response => {
                if(response.status >= 400) return Promise.reject();
            }).catch(err => {
                console.log(err)
            })
            
    }

    onClose = e => {
        e.preventDefault()
        store.dispatch({
            type: "STOPMUSIC"
        })
        let prev = this.props.page.prev
        if(prev){
            store.dispatch({
                type: "SETPAGENAME",
                data: {
                    pagename: prev
                }
            })
        }else{
            store.dispatch({
                type: "SETPAGENAME",
                data: {
                    pagename: "mylist"
                }
            })
        }
    }

    onSongs = e => {
        e.preventDefault()
        this.setState(() => ({
            innerpage: "songs"
        }))
    }

    onDetail = e => {
        e.preventDefault()
        this.setState(() => ({
            innerpage: "detail"
        }))
    }

    onSetting = e => {
        e.preventDefault()
        this.setState(() => ({
            innerpage: "setting"
        }))
    }

    onAddSong = e => {
        e.preventDefault()
        store.dispatch({
            type: "SETPAGENAME",
            data: {
                pagename: "addsong"
            }
        })
    }

    onFork = e => {
        e.preventDefault()
        this.setState(() => ({
            forked: true
        }))
        fetch(api("forkpl"), {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                "x-auth": this.props.user.token
            }),
            body: JSON.stringify({pid: this.props.page.pid})
        })
        .then(response => {
            if(response.status >= 400) return Promise.reject()
        })
        .catch(err => {
            console.log(err)
            this.setState(() => ({
                forked: false
            }))
        })
    }

    render(){
        var thispl = this;
        return (
            <div>
                <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="#" onClick={this.onClose}>
                            <i className="fa fa-chevron-left" aria-hidden="true" width="28" height="28"></i>
                        </a>
                        <span className="navbar-item">{this.state.pl.isPrivate ? <i className="fa fa-lock" aria-hidden="true"></i> : ""}&nbsp;&nbsp;Playlist</span>
                    </div>
                </nav>
                <div className="tabs list-tab">
                    <ul>
                        <li 
                            className={this.state.innerpage === "songs" ? "is-active" : ""}
                            onClick={this.onSongs}    
                        >
                            <a>Songlist</a>
                        </li>
                        <li
                            className={this.state.innerpage === "detail" ? "is-active" : ""}
                            onClick={this.onDetail} 
                        >
                            <a>Detail</a>
                        </li>
                        {((valid) => {
                            if(valid){
                                return (
                                    <li
                                        className={thispl.state.innerpage === "setting" ? "is-active" : ""}
                                        onClick={thispl.onSetting} 
                                    >
                                        <a>Modify</a>
                                    </li>
                                )
                            }
                        })(this.state.pl.creator === thispl.props.user.email)}
                        {(() => {
                            // if(this.state.innerpage === "songs"){
                            //     if(this.state.pl.creator === thispl.props.user.email){
                            //         return <button className="button is-primary is-pulled-right add-pl" onClick={this.onAddSong}>Add Song</button>
                            //     }else{
                            //         if(!this.state.forked){
                            //             return <button className="button is-link is-pulled-right add-pl" onClick={this.onFork}>Collect</button>
                            //         }else{
                            //             return <button className="button is-link is-pulled-right add-pl" disabled onClick={this.onFork}>Collected</button>
                            //         }
                            //     }
                            // }
                        })()}
                        <button className="button is-info is-pulled-right add-pl">
                            <i className="fa fa-share-alt" aria-hidden="true"></i>
                            &nbsp;
                            Share
                        </button>
                    </ul>
                </div>
                <div className="zi-panel">
                    {(() => {
                        if(this.state.notFound){
                            return (
                                <div>Playlist not found</div>
                            )
                        }else{
                            let onepl = this.state.pl
                            switch(this.state.innerpage){
                                case "songs":
                                    return <Songlist pl={onepl} />
                                case "detail":
                                    return <Detail pl={onepl} />
                                case "setting":
                                    return <Modifypl onepl={onepl} />
                                case "details":
                                    return <Detail pl={onepl} />
                                default:
                                    return <div>Loading...</div>

                            }
                        }
                })()}
                </div>
            </div>
        )

    }

}

const mapStatetoProps = state => (
    {
        user: state.user,
        page: state.page,
        pl: state.pl,
        player: state.player
    }
 );

 
export default connect(mapStatetoProps)(Playlist)
