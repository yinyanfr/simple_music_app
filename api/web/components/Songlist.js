import React, { Component } from 'react'
import OnesongPl from "./OnesongPl"
import {connect} from "react-redux";
import api from "./../lib/api";
import store from "./../redux/configureStore"

class Songlist extends Component{

    pl = this.props.pl

    onAddSong = e => {
        e.preventDefault()
        store.dispatch({
            type: "SETPAGENAME",
            data: {
                pagename: "addsong"
            }
        })
    }

    render(){
        console.log(this.props.pl)
        return (
            <div id="songlist">
                {this.props.pl.songs.length === 0 ? <h2 className="title is-2">Nothing here</h2> : ""}

                {this.pl.creator === this.props.user.email
                    ? (
                        <button className="button is-primary big-end-button" onClick={this.onAddSong}>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                            &nbsp;&nbsp;
                            Add songs
                        </button>
                    )
                    : ""}
                
                <div>{
                    this.pl.songs.map((e, i) => (
                        <OnesongPl key={i}>{e}</OnesongPl>
                    ))
                }</div>

            </div>
        )
    }
}
const mapStatetpProps = state => (
    {
        user: state.user
    }
)


export default connect(mapStatetpProps)(Songlist)
