import React, { Component } from 'react'
import {connect} from "react-redux";
import api from "./../lib/api";
import store from "./../redux/configureStore"
import OnePL from "./OnePL"

var globalSearchList = []

class Searchpl extends Component{

    state = {
        keyword: "",
        loading: false,
        result: []
    }

    onClose = e => {
        e.preventDefault()
        store.dispatch({
            type: "SETPAGENAME",
            data: {
                pagename: "collection"
            }
        })
    }

    onChangeInput = e => {
        let {value} = e.target
        this.setState(() => ({
            keyword: value
        }))
    }

    onSearch = e => {
        e.preventDefault()
        if(this.state.keyword.length){
            this.setState(() => ({
                loading: true
            }))
            fetch(api(`searchpl/${this.state.keyword}`))
                .then(response => {
                    if(response.status >= 400) return Promise.reject();
                    return response.json()
                })
                .then(result => {
                    this.setState(() => ({
                        result,
                        loading: false
                    }))
                    store.dispatch({
                        type: "SETSEARCHLIST",
                        data:{
                            list: result
                        }
                    })
                    globalSearchList = result
                })
        }
    }

    render(){
        return (
            <div>
                <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="#" onClick={this.onClose}>
                            <i className="fa fa-chevron-left" aria-hidden="true" width="28" height="28"></i>
                        </a>
                        <span className="navbar-item">Search Playlists</span>
                    </div>
                </nav>

                <div className="zi-panel zi-panel-margin">
                    <form className="field" onSubmit={this.onSearch}>
                        <div className={this.state.loading? "control has-icons-left is-loading" : "control has-icons-left"}>
                            <input className="input is-rounded" type="text" placeholder="Search" 
                                value={this.state.keyword}
                                onChange={this.onChangeInput}
                            />
                            <span className="icon is-small is-left">
                                <i className="fa fa-search"></i>
                            </span>
                        </div>
                    </form>

                    <div>{(() => {
                        if(this.state.result.length){
                            return (
                                this.state.result.map((e, i) => (
                                    <OnePL key={i}>{e}</OnePL>
                                ))
                            )
                        }else{
                            console.log(globalSearchList)
                            return (
                                globalSearchList.map((e, i) => (
                                    <OnePL key={i}>{e}</OnePL>
                                ))
                            )
                        }
                    })()}</div>
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
        search: state.search
    }
 );

 
export default connect(mapStatetoProps)(Searchpl)
