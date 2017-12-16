import React, { Component } from 'react';
import {connect} from "react-redux";
import Header from "./Header";
import Mylist from "./Mylist";
import AddPlaylist from "./AddPlaylist";
import api from "./../lib/api";
import Collection from "./Collection"
 
class Body extends Component{

    render(){
        return (
            <div>
                <Header />
                <div>
                    {
                        (() => {
                            console.log(this.props.page.pagename)
                            switch (this.props.page.pagename) {
                                case "mylist":
                                    return <Mylist />
                                case "collection":
                                    return <Collection />
                                case "loading":
                                    return <Mylist />
                                default:
                                    return <Mylist />
                            }
                        })()
                    }
                </div>
            </div>
        )
    }
}

const mapStatetoProps = state => (
    {
        page: state.page,
        user: state.user,
        pl: state.pl
    }
)

export default connect(mapStatetoProps)(Body);

