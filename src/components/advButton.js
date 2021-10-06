import React from 'react';

export function AdvButton(props){
    return (
    <button onClick ={props.onClick} className="pushable" style={{width:props.width,height:props.height}}>
        <span className="shadow"></span>
        <span className="edge"></span>
        <span className="front">
          {props.text}
        </span>
    </button>
    )
  }