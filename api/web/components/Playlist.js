import React, { Component } from 'react';
import {connect} from "react-redux";
import api from "./../lib/api";
import store from "./../redux/configureStore"

class Playlist extends Component{

    state = {
        notFound: false,
        pl: []
    }

    componentDidMount(){
        if(!this.props.pid) {
            this.setState(() => ({
                notFound: true
            }))
        }
        let {pid} = this.props
        fetch(api(`pl/${pid}`))
            .then(response => {
                if(response.status >= 400) return Promise.reject("not found");
                return response.json()
            })
            .then(pl => {
                this.setState(() => ({
                    pl
                }))
            })
            .catch(err => {
                console.log(err);
                this.setState(() => ({
                    notFound: true
                }))
            })
    }

    render(){
        return (
            <div>
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="#">
                            <img src="./../high.png" alt="Listen, together" width="28" height="28" />
                        </a>
                        <span className="navbar-item">Playlist</span>
                        <button className="delete"></button>
                    </div>
                </nav>
                {(() => {
                    if(this.state.notFound){
                        return (
                            <div>Playlist not found</div>
                        )
                    }else{
                        return (
                            <div>
                                {JSON.stringify(this.state.pl)}
                            </div>
                        )
                    }
                })()}
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

 
export default connect(mapStatetoProps)(Playlist)
