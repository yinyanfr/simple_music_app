import React, { Component } from 'react';
import {connect} from "react-redux";
import Auth from "./components/Auth";
import Body from "./components/Body";
import Logopage from "./components/Logopage";
import AddPlayList from "./components/AddPlaylist"
import Mylist from "./components/Mylist"

const Main = props => (
    <div>
        {
            (() => {
                console.log(props.page.pagename);
                switch (props.page.pagename) {
                    case "auth":
                        return <Auth />
                    case "mylist":
                        return <Body />
                    case "logo":
                        return <Logopage />
                    case "addplaylist":
                        return <AddPlayList />
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



