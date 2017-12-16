import React, { Component } from 'react'
import Hero from "./Hero"
import api from "./../lib/api"
import moment from "moment"

class Detail extends Component{

    state = {
        creatorName: ""
    }

    componentDidMount(){
        fetch(api(`searchUser/${this.pl.creator}`))
            .then(response => {
                if(response.status > 200) return Promise.reject();
                return response.json()
            })
            .then(obj => {
                this.setState(() => ({
                    creatorName: obj.pseudo
                }))
            })
            .catch(err => {
                console.log(err)
                this.setState(() => ({
                    creatorName: "unknown"
                }))
            })
    }

    pl = this.props.pl

    render(){
        return (
            <div>
                <Hero title={this.pl.name} subtitle={`Created by ${this.state.creatorName}`} />

                <nav className="level is-mobile">
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading pl-status-head">Songs</p>
                            <p className="title">{this.pl.songs.length}</p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading pl-status-head">Listened</p>
                            <p className="title">{this.pl.listenedTimes}</p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading pl-status-head">Shared</p>
                            <p className="title">{this.pl.sharedTimes}</p>
                        </div>
                    </div>
                </nav>
                <h4 className="title is-4">Creator: </h4>
                <p className="subtitle is-4 is-spaced">{this.state.creatorName}</p>
                <h4 className="title is-4">Created At: </h4>
                <p className="subtitle is-4 is-spaced">{moment(this.pl.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                <h4 className="title is-4">Description: </h4>
                <p className="subtitle is-4 is-spaced">{this.pl.msg}</p>
            </div>
        )
    }
}

export default Detail
