import React, { Component } from 'react';
import {connect} from "react-redux";
import Logopage from "./components/Logopage";
import Body from "./components/Body";
import RL from "./components/RL";

const Main = props => (
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
);

const mapStatetoProps = state => (
   {
       user: state.user
   }
)

export default connect(mapStatetoProps)(Main)

