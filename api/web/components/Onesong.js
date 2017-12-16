import React, { Component } from 'react';
import {connect} from "react-redux";
import api from "./../lib/api";
import store from "./../redux/configureStore"
import moment from "moment"

class Onesong extends Component{

    state = {
        added: false
    }

    onAdd = e => {
        e.preventDefault()
        this.setState(() => ({
            added: true
        }))
        const {title, channelTitle:artist, link, publishedAt, description} = this.props.children
        const source = "youtube"
        const img = this.props.children.thumbnails.high.url
        const song = {
            pid: this.props.page.pid, 
            title, artist, source, link, img, description
        }
        fetch(api("pushsong"), {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                "x-auth": this.props.user.token
            }),
            body: JSON.stringify(song)
        }).then(response => {
            if(response.status >= 400) return Promise.reject("Add playlist failed");
            return response.json()
        })
        .then(obj => {
            console.log("song added")
        })
        .catch(err => {
            console.log(err)
            this.setState(() => ({
                added: false
            }))
        })
    }

    onNothing = e => {
        e.preventDefault()
    }

    render(){
        // pid, title, artist, source, link, img
        const {title, channelTitle:artist, link, publishedAt, description} = this.props.children
        const source = "youtube"
        const img = this.props.children.thumbnails.high.url
        return (
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
                            <br />
                            <time>{moment(publishedAt).format('MMMM Do YYYY, h:mm:ss a')}</time>
                        </div>
                    </div>

                    <footer className="card-footer">
                        {
                            this.state.added 
                                ? <a href="#" className="card-footer-item" onClick={this.onNothing}>Added</a>
                                : <a href="#" className="card-footer-item" onClick={this.onAdd}>Add</a>
                        }
                    </footer>
                </div>
            </div>
        )
    }
}

const mapStatetpProps = state => (
    {
        user: state.user,
        pl: state.pl,
        page: state.page
    }
)


export default connect(mapStatetpProps)(Onesong)
