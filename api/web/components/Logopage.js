import React, { Component } from 'react';
import api from "./../lib/api";
import {connect} from "react-redux";
import store from "./../redux/configureStore";
import Hero from "./Hero"

class Logopage extends Component{

    onStart = e => {
        e.preventDefault()
        store.dispatch({
            type: "SETPAGENAME",
            data: {
                pagename: "auth"
            }
        })
    }

    render(){
        console.log(this.props.i18n)
        let {t} = this.props.i18n
        return (
            <div>
                <Hero title={this.props.i18n.t.logopage.title} subtitle={this.props.i18n.t.logopage.subtitle} />
            <button className="button is-primary" onClick={this.onStart}>{t.logopage.start}</button>
            </div>
        )
    }
}


const mapStatetoProps = state => (
    {
        page: state.page,
        i18n: state.i18n
    }
 )

 
export default connect(mapStatetoProps)(Logopage)
