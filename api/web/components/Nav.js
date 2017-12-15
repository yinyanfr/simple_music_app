import React, { Component } from 'react'

class Nav extends Component{

    render(){
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="#">
                        <img src="./../high.png" alt="Listen, together" width="28" height="28" />
                    </a>
                    <span className="navbar-item">{this.props.children}</span>
                </div>
            </nav>
        )
    }
}

export default Nav
