import React, { Component } from 'react'
import {connect} from "react-redux";
import api from "./../lib/api";
import store from "./../redux/configureStore";
import OnePL from "./OnePL";

class Collection extends Component{

    onMylist = e => {
        e.preventDefault()
        store.dispatch({
            type: "SETPAGENAME",
            data: {
                pagename: "mylist"
            }
        })
    }

    onCollection = e => {
        e.preventDefault()
        store.dispatch({
            type: "SETPAGENAME",
            data: {
                pagename: "collection"
            }
        })
    }


    render(){
        return (
            <div>
                <div className="tabs">
                    <ul>
                        <li 
                            className={this.props.page.pagename === "mylist" ? "is-active" : ""}
                            onClick={this.onMylist}    
                        >
                            <a>Mylists</a>
                        </li>
                        <li
                            className={this.props.page.pagename === "collection" ? "is-active" : ""}
                            onClick={this.onCollection} 
                        >
                            <a>Collections</a>
                        </li>
                    </ul>
                </div>
                <div className="zi-panel">
                    <div>My collections</div>
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

export default connect(mapStatetoProps)(Collection)
