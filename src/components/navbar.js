import React from 'react';

export function NavBar(props){
    return (

    <div  className="NavBar"  style={{alignItems: 'flex-end', zIndex:1}}>
        <a onClick={()=>{props.showDebug()}}>Debug</a>
        <a href="#ContactDiv">Contact</a>
        <a href="#VRDiv">VR</a>
        <a href="#PortfolioDiv">Portfolio</a>
        <a href="#HomeDiv">Home</a> 
      </div>
    )
  }