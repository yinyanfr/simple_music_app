import React, { Component } from 'react';
import {connect} from "react-redux";
import api from "./../lib/api";
import store from "./../redux/configureStore"
import moment from "moment"

class OnesongPl extends Component{

    render(){
        // pid, title, artist, source, link, img
        const {title, artist, link, img, description} = this.props.children
        const source = "youtube"
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
                        </div>
                    </div>

                    <footer className="card-footer">
                        <a href="#" className="card-footer-item" onClick={this.onPlay}>Play</a>
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


export default connect(mapStatetpProps)(OnesongPl)
