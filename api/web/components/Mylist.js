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

    render(){
        return (
            <div>
                <button onClick={this.onAddPlaylist}>Add Playlist</button>
                <div>{(() => {
                    var arr = [];
                    this.props.pl.forEach((e, i) => {
                        arr.push(<OnePL key={i}>{e}</OnePL>)
                    });
                    return arr
                })()}</div>
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