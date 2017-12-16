import React, { Component } from 'react'

class Songlist extends Component{

    pl = this.props.pl

    render(){
        return (
            <div>{JSON.stringify(this.pl.songs)}</div>
        )
    }
}

export default Songlist
