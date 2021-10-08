import React from 'react';
import { Link } from "react-router-dom";

export function NavBar(props){
    return (

    <div  className="NavBar"  style={{alignItems: 'flex-end', zIndex:1}}>
        <a onClick={()=>{props.showDebug()}}>Debug</a>
        <a href="#ContactDiv">Contact</a>
        <Link to="/vr">VR</Link>
        <a href="#ServicesDiv">Portfolio</a>
        <a href="#HomeDiv">Home</a> 
      </div>
    )
  }