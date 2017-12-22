import React, { Component } from 'react';
import {connect} from "react-redux";
import api from "./../lib/api";
import store from "./../redux/configureStore";
import OnePL from "./OnePL";

class Collection extends Component{

    state = {
        pls: []
    }

    componentDidMount = e => {
        const {token} = this.props.user
        fetch(api("mycollection"), {
            method: "GET",
            headers: new Headers({
                "x-auth": token
            })
        })
        .then(response => {
            if(response.status >= 400) return Promise.reject("Get playlist failed");
            return response.json()
        })
        .then(obj => {
            
            console.log("There, i did")
            this.props.dispatch({
                type: "REFRESHPL",
                data: obj
            })

            this.setState(() => ({
                pls: obj
            }))
        })
        .catch(err => {
            console.log(err)
        })
    }

    onSearchPlaylist = e => {
        store.dispatch({
            type: "SETPAGENAME",
            data: {
                pagename: "searchpl"
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
        console.log(pls)
        var arr = [];
        // this.props.pl.forEach((e, i) => {
        //     arr.push(<OnePL key={i}>{e}</OnePL>)
        // });

        for(let i = 0; i < this.props.pl.length; i++){
            arr[i] = (<OnePL key={i}>{this.props.pl[i]}</OnePL>)
        }
        return arr
    }

    render(){
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
                        <button className="button is-link is-pulled-right add-pl" onClick={this.onSearchPlaylist}>Search Playlist</button>
                    </ul>
                </div>
                <div className="pls zi-panel">
                    <div>{this.state.pls.map((e, i) => (
                        <OnePL key={i}>{e}</OnePL>
                    ))}</div>

                
                        <button className="button is-link big-end-button" onClick={this.onSearchPlaylist}>
                            <i className="fa fa-search" aria-hidden="true"></i>
                            &nbsp;&nbsp;
                            Search Playlist
                        </button>
                
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

 
export default connect(mapStatetoProps)(Collection)
