import React, { Component } from 'react';
import {connect} from "react-redux";
import api from "./../lib/api";
import {Modal} from "react-modal";
import store from "./../redux/configureStore";
import OnePL from "./OnePL";

class Mylist extends Component{

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

    renderPLs = pls => {
        var arr = [];
        this.state.pls.forEach((e, i) => {
            arr.push(<OnePL key={i}>{e}</OnePL>)
        });
        return arr
    }

    render(){
        console.log("pl", this.props.pl)
        return (
            <div className="pls">
                <button onClick={this.onAddPlaylist}>Add Playlist</button>
                <div>{this.renderPLs()}</div>
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