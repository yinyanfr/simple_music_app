import React, { Component } from 'react';
import {connect} from "react-redux";
import api from "./../lib/api";
import store from "./../redux/configureStore"

class OneSong extends Component{

    render(){
        return (
            <div>
            
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
