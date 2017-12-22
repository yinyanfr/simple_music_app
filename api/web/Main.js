import React, { Component } from 'react';
import {connect} from "react-redux";
import Auth from "./components/Auth";
import Body from "./components/Body";
import Logopage from "./components/Logopage";
import AddPlayList from "./components/AddPlaylist"
import Mylist from "./components/Mylist"
import Playlist from "./components/Playlist"
import Addsong from "./components/AddSong"
import Player from "./components/Player"
import Mystatus from "./components/Mystatus"
import Searchpl from "./components/Searchpl"
import Modifyme from "./components/Modifyme"

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
                    case "collection":
                        return <Body />
                    case "logo":
                        return <Logopage />
                    case "addplaylist":
                        return <AddPlayList />
                    case "playlist":
                        return <Playlist pid={props.page.pid} />
                    case "addsong":
                        return <Addsong pid={props.page.pid} />
                    case "player":
                        return <Player song={props.page.sid} />
                    case "mystatus":
                        return <Mystatus />
                    case "searchpl":
                        return <Searchpl />
                    case "modifyme":
                        return <Modifyme />
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



