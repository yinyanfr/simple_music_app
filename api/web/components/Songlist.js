import React, { Component } from 'react'

class Songlist extends Component{

    pl = this.props.pl

    render(){
        console.log(this.props.pl)
        return (
            <div>
                {this.props.pl.songs.length === 0 ? <h2 className="title is-2">Nothing here</h2> : ""}
                <div>{JSON.stringify(this.pl.songs)}</div>
            </div>
        )
    }
}

export default Songlist
