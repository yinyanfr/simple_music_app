import React, { Component } from 'react';
import {connect} from "react-redux";
import Auth from "./components/Auth";
import Body from "./components/Body";
import Logopage from "./components/Logopage";

const Main = props => (
    <div>
        {
            (() => {
                switch (props.page.pagename) {
                    case "auth":
                        return <Auth />
                    case "mylist":
                        return <Body />
                    case "logo":
                        return <Logopage />
                    default:
                        return <Logopage />
                }
            })()
        }
    </div>
);

const mapStatetoProps = state => (
    {
        page: state.page
    }
 )

 
export default connect(mapStatetoProps)(Main)



