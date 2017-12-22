import React, { Component } from 'react';
import {connect} from "react-redux";
import api from "./../lib/api";
import store from "./../redux/configureStore"
import moment from "moment"
import ReactPlayer from "react-player"

class OnesongPl extends Component{

    state = {
        isPlaying: false
    }


    onPlay = e => {
        e.preventDefault()
        const pid = this.props.page.pid
        const {title, artist, link, img, description} = this.props.children
        const song = {title, artist, link, img, description}
        if(this.props.player.nowplaying === link){
            store.dispatch({
                type: "STOPMUSIC"
            })
            this.setState(() => ({
                isPlaying: false
            }))
        }else{
            store.dispatch({
                type: "CHANGETRACK",
                data: {
                    link
                }
            })
            this.setState(() => ({
                isPlaying: true
            }))
        }
    }
    
    onFinish = e => {
        e.preventDefault()
        this.setState(() => ({
            isPlaying: false
        }))
        store.dispatch({
            type: "STOPMUSIC"
        })
    }

    render(){
        // pid, title, artist, source, link, img
        const {title, artist, link, img, description} = this.props.children
        const source = "youtube"
        return (
            <div>
                {
                    this.props.player.nowplaying === link
                    ? <ReactPlayer width={0} height={0} url={link} onEnded={this.onFinish} playing />
                    : ""
                }
                
                <div className="card-margin">
                    <div className="card">
                        <div className="card-image">
                        <figure className="image is-16by9">
                            <img src={img} alt="Placeholder image" />
                        </figure>
                        </div>
                        <div className="card-content">
                            <div className="media">
                                <div className="media-content">
                                    <p className="title is-4">{title}</p>
                                    <p className="subtitle is-6">{artist}</p>
                                </div>
                            </div>
                        
                            <div className="content break-letter">
                                {description}
                            </div>
                        </div>

                        <footer className={(this.props.player.nowplaying === link) ? "card-footer pl-playing" : "card-footer"}>
                            <a href="#" className="card-footer-item" onClick={this.onPlay}>
                                <i className={this.props.player.nowplaying === link ? "fa fa-pause" : "fa fa-play"} aria-hidden="true"></i>
                                &nbsp;&nbsp;
                                {this.props.player.nowplaying === link ? "Pause" : "Play"}
                            </a>
                        </footer>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStatetpProps = state => (
    {
        user: state.user,
        pl: state.pl,
        page: state.page,
        player: state.player
    }
)


export default connect(mapStatetpProps)(OnesongPl)
