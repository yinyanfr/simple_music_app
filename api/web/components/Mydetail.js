import React, { Component } from 'react'
import Hero from "./Hero"
import api from "./../lib/api"
import moment from "moment"
import {connect} from "react-redux";
import store from "./../redux/configureStore"

class Mydetail extends Component{

    state = {
        plNum: 0,
        listenedSum: 0,
        sharedSum: 0
    }

    componentDidMount(){
        fetch(api("mystatus"), {
            method: "GET",
            headers: new Headers({
                "x-auth": this.props.user.token
            })
        })
        .then(response => {
            if(response.status > 200) return Promise.reject();
            return response.json()
        })
        .then(status => {
            let {plNum, listenedSum, sharedSum} = status
            this.setState(() => ({
                plNum, listenedSum, sharedSum
            }))
        })
        .catch(err => {
            console.log(err)
        })
    }


    render(){
        return (
            <div>
                <Hero title={this.props.user.pseudo} />

                <nav className="level is-mobile">
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading pl-status-head">Playlists</p>
                            <p className="title">{this.state.plNum}</p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading pl-status-head">Listened</p>
                            <p className="title">{this.state.listenedSum}</p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading pl-status-head">Shared</p>
                            <p className="title">{this.state.sharedSum}</p>
                        </div>
                    </div>
                </nav>
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

 
export default connect(mapStatetoProps)(Mydetail)
