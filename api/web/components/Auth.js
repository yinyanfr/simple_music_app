import React, { Component } from 'react';
import {connect} from "react-redux";
import store from "./../redux/configureStore";
import Logopage from "./Logopage";
import Body from "./Body";
import RL from "./RL";

const Auth = props => (
    <div>
        {
            (() => {
                if(props.user === 0){
                    return <Logopage />   
                }if(props.user === false){
                    return <RL />
                }else{
                    return <Body />
                }
            })()
        }
    </div>
)

const mapStatetoProps = state => (
    {
        user: state.user,
        page: state.page
    }
 )

 
export default connect(mapStatetoProps)(Auth)
