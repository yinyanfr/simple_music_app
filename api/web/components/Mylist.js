import React, { Component } from 'react';
import {connect} from "react-redux";
import api from "./../lib/api";
import store from "./../redux/configureStore";
import OnePL from "./OnePL";

class Mylist extends Component{

    componentDidMount = e => {
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
        })
        .catch(err => {
            console.log(err)
        })
    }

    onAddPlaylist = e => {
        store.dispatch({
            type: "SETPAGEALL",
            data: {
                pagename: "addplaylist",
                pid: "",
                sid: ""
            }
        })
    }

    onMylist = e => {
        e.preventDefault()
        store.dispatch({
            type: "SETPAGENAME",
            data: {
                pagename: "mylist"
            }
        })
    }

    onCollection = e => {
        e.preventDefault()
        store.dispatch({
            type: "SETPAGENAME",
            data: {
                pagename: "collection"
            }
        })
    }

    renderPLs = pls => {
        var arr = [];
        this.props.pl.forEach((e, i) => {
            arr.push(<OnePL key={i}>{e}</OnePL>)
        });
        return arr
    }

    render(){
        console.log("pl", this.props.pl)
        return (
            <div>
                <div className="tabs list-tab">
                    <ul>
                        <li 
                            className={this.props.page.pagename === "mylist" ? "is-active" : ""}
                            onClick={this.onMylist}    
                        >
                            <a>Mylists</a>
                        </li>
                        <li
                            className={this.props.page.pagename === "collection" ? "is-active" : ""}
                            onClick={this.onCollection} 
                        >
                            <a>Collections</a>
                        </li>
                        <button className="button is-primary add-pl" onClick={this.onAddPlaylist}>Add Playlist</button>
                    </ul>
                </div>
                <div className="pls zi-panel">
                    <div>{this.renderPLs(this.props.pl)}</div>
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
 );

 
export default connect(mapStatetoProps)(Mylist)
