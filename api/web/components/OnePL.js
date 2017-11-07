import React, { Component } from 'react';

const OnePL = props => {
    var pl = props.children;
    console.log(pl)

    return(
        <div>
            <div>{pl.name}</div>
            <button>Enter</button>
        </div>
    )
}

export default OnePL;