import './App.css';
import profile from './Profile.jpg' 
import React, { useState } from 'react';
import { GameBoy } from './components/gameBoy';
import { GravityDemo } from './demos/physicsDemos/gravityDemo';
import { FlappyBirdDemo } from './demos/gameDemos/flappyDemo';
import { AsteriodDemo } from './demos/gameDemos/asteriods';
// import canvasGame from 

function App() {
  const [mousePosition, setMousePosition] = useState({left: 0,top: 0})
  const [winDimensions, setWinDimensions] = useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })
  const [canScrollX, setCanScrollX] = useState(true);
  const [debugDisplay, setDebugDisplay] = useState("")

  React.useEffect(() => {
    function handleResize() {
      setWinDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }

    window.addEventListener('resize', handleResize);
    window.onscroll = function () {
      if (canScrollX===false)
        window.scrollTo(0,window.scrollY);
    };
  })

  function handleMouseMove(ev) { setMousePosition({left: ev.pageX, top: ev.pageY}); }
  return (
    <div className="App" onMouseMove={(ev)=> handleMouseMove(ev)} >
      <header className="App-header">
      <NavBar showDebug = {()=>setDebugDisplay("")}></NavBar>
      </header>
      {/* <canvas id = "canvas" ></canvas> */}
      <div id = "HomeDiv" className = "section">
        {/* <h1>Home</h1> */}
        {/* <img src = {profile} alt="Profile"></img> */}
      </div>
      <div id = "AboutDiv" className = "section">
        <h1>About</h1>
      </div>
      <div id = "ServicesDiv" className = "section">
        <h1>Services</h1>
      </div>
      <div id = "PortfolioDiv" className = "section">
        <h1>Portfolio</h1>
        All demos in the porftolio are interactable. Click on a demo to begin.
        <h3>Physics Demos</h3>
        <GravityDemo/>
        <h3>Game Dev Demos</h3>
        <FlappyBirdDemo/>
        <AsteriodDemo/>
      </div>
      
      <div id = "ContactDiv" className = "section">
        <h1>Contact</h1>
      </div>
      <div id = "debugDiv" className="Debug" style={{display:debugDisplay}}>
        <div style={{display:'block'}}>
        <h1 style={{display:'inline', marginRight:"100px"}}>Debug</h1>
        <button onClick={()=>{setDebugDisplay("none")}}>Hide</button>
        </div>
        
        {`Mouse Coords = ${mousePosition.left},${mousePosition.top}\n
        Window Dims  = ${winDimensions.width},${winDimensions.height}`}
      </div>
    </div>
  );
}

function NavBar(props){
  return (
    <div className="NavBar" style={{alignItems: 'flex-end', zIndex:1}}>
      <a onClick={()=>{props.showDebug()}}>Debug</a>
      <a href="#ContactDiv">Contact</a>
      <a href="#PortfolioDiv">Portfolio</a>
      <a href="#ServicesDiv">Services</a>
      <a href="#AboutDiv">About</a>
      <a href="#HomeDiv">Home</a>
    </div>
  )
}


export default App;