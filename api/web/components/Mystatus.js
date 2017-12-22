import React, { Component } from 'react'
import Mydetail from "./Mydetail"
import {connect} from "react-redux";
import store from "./../redux/configureStore"

class Mystatus extends Component{

    onClose = e => {
        e.preventDefault()
        let {prev} = this.props.page.pagename
        store.dispatch({
            type: "SETPAGENAME",
            data: {
                pagename: prev || "mylist"
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
                        <span className="navbar-item">My Status</span>
                    </div>
                </nav>
                <div className="zi-panel">
                    <Mydetail />
                </div>
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

 
export default connect(mapStatetoProps)(Mystatus)
