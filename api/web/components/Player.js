import React, { Component } from 'react'
import ReactPlayer from "react-player"
import {connect} from "react-redux";
import api from "./../lib/api";
import store from "./../redux/configureStore"

class Player extends Component{

    onClose = e => {
        e.preventDefault()
        store.dispatch({
            type: "SETPAGENAME",
            data: {
                pagename: "playlist"
            }
        })
    }

    render(){
        return (
            <div>
                <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="#" onClick={this.onClose}>
                            <i className="fa fa-chevron-left" aria-hidden="true" width="28" height="28"></i>
                        </a>
                        <span className="navbar-item">Player</span>
                    </div>
                </nav>

                <ReactPlayer width={0} height={0} url={this.props.song.link} playing />

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

const mapStatetoProps = state => (
    {
        user: state.user,
        page: state.page,
        pl: state.pl
    }
 );

 
export default connect(mapStatetoProps)(Player)
