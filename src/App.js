import './App.css';
import profile from './Profile.jpg' 
import React, { useState } from 'react';
import { VRPage } from './vr/vrpage';
import { NavBar } from './components/navbar';
import { GameBoy } from './components/gameBoy';
import { GravityDemo } from './demos/physicsDemos/gravityDemo';
import { FlappyBirdDemo } from './demos/gameDemos/flappyDemo';
import { AsteriodDemo } from './demos/gameDemos/asteriods';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

// import canvasGame from 

function App() {
  return(
    <Router>
      <Switch>
        {/* <Route path="/about">
          <About />
        </Route>
        <Route path="/users">
          <Users />
        </Route> */}
        <Route exact path="/">
          <Mainpage />
        </Route>
        <Route exact path="/site">
          <Mainpage />
        </Route>
        <Route exact path="/vr">
          <VRPage />
        </Route>
      </Switch>
    </Router>
  )
}

const Mainpage = () => {
  const [mousePosition, setMousePosition] = useState({left: 0,top: 0})
  const [winDimensions, setWinDimensions] = useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })
  const [canScrollX, setCanScrollX] = useState(true);
  const [debugDisplay, setDebugDisplay] = useState("none")

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

  function toggleDebug(){
    if (debugDisplay === ""){
      setDebugDisplay("none");
    }else{
      setDebugDisplay('')
    }
  }
  

  function handleMouseMove(ev) { setMousePosition({left: ev.pageX, top: ev.pageY}); }
  return (
    <div className="App" onMouseMove={(ev)=> handleMouseMove(ev)} >
      <header className="App-header">
      <NavBar showDebug = {()=>toggleDebug()}></NavBar>
      </header>
      {/* <canvas id = "canvas" ></canvas> */}
      <div id = "HomeDiv" className = "section">
        {/* <h1>Home</h1> */}
        {/* <img src = {profile} alt="Profile"></img> */}
      </div>
      <div id = "AboutDiv" className = "section">
        <h1>About</h1>
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
      <div id = "VRDiv" className = "section">
        <h1>Enter VR Portfolio</h1>
        <Link to="/vr">VR</Link>

      </div>
      <div id = "ContactDiv" className = "section">
        <h1>Contact</h1>
      </div>
      <div id = "debugDiv" className="Debug" style={{display:debugDisplay}}>
        <div style={{display:'block'}}>
        <h1 style={{display:'inline', marginRight:"100px"}}>Debug</h1>
        <button onClick={()=>{toggleDebug()}}>Hide</button>
        </div>
        
        {`Mouse Coords = ${mousePosition.left},${mousePosition.top}\n
        Window Dims  = ${winDimensions.width},${winDimensions.height}`}
      </div>
    </div>
  );
} 




export default App;