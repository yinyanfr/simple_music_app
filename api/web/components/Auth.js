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
                    store.dispatch({
                        type: "SETPAGENAME",
                        data: {
                            pagename: "mylist"
                        }
                    })
                    return <RL />
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
