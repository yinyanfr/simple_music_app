import React, { Component } from 'react'
import OnesongPl from "./OnesongPl"

class Songlist extends Component{

    pl = this.props.pl

    render(){
        console.log(this.props.pl)
        return (
            <div id="songlist">
                {this.props.pl.songs.length === 0 ? <h2 className="title is-2">Nothing here</h2> : ""}
                
                    <button id="play-all" className="button is-primary">
                        <i className="fa fa-play" aria-hidden="true"></i>
                        &nbsp;&nbsp;
                        Play All
                    </button>
                
                <div>{
                    this.pl.songs.map((e, i) => (
                        <OnesongPl key={i}>{e}</OnesongPl>
                    ))
                }</div>
            </div>
        )
    }
}

export default Songlist
