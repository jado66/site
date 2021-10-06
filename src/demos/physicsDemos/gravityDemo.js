import { GameBoy } from "../../components/gameBoy";
import { PlanetMover } from "../physicsObjects/planetMover";
import { StarAttractor } from "../physicsObjects/starAttractor";
import React from 'react';

export class GravityDemo extends React.Component{
    constructor(props){
        super(props);

        var canvasDims = {width:1180,height:600};
        
        var sunCoords = {x: canvasDims.width/2, y:  canvasDims.height/2}
        var sunDrawInst = {radius:35,color :"#ffea00"}
        var sun = new StarAttractor(sunCoords,{dx:0,dy:0},sunDrawInst, 333000,true);

        var mercCoords = {x: canvasDims.width/2, y:  canvasDims.height/2-53}
        var mercVel = {dx:-2.2, dy:0}
        var mercDrawInst = {radius:2,color :"#e8ad4f"}
        var mercury = new PlanetMover(mercCoords,mercVel,mercDrawInst, .5, sun);

        var venusCoords = {x: canvasDims.width/2+75, y:  canvasDims.height/2}
        var venusVel = {dx:0, dy:-1.5}
        var venusDrawInst = {radius:1.5,color :"#ffbd2e"}
        var venus = new PlanetMover(venusCoords,venusVel,venusDrawInst, .75, sun);   

        var earthCoords = {x: canvasDims.width/2, y:  canvasDims.height/2+90}
        var earthVel = {dx:1.659, dy:0}
        var earthDrawInst = {radius:3.5,color :"#00b3ff"}
        var earth = new PlanetMover(earthCoords,earthVel,earthDrawInst, 1, sun);   

        var marsCoords = {x: canvasDims.width/2, y:  canvasDims.height/2-110}
        var marsVel = {dx:-1.5, dy:0}
        var marsDrawInst = {radius:3,color :"#ff8819"}
        var mars = new PlanetMover(marsCoords,marsVel,marsDrawInst, 1.2, sun); 

        var jupiterCoords = {x: canvasDims.width/2, y:  canvasDims.height/2-170}
        var jupiterVel = {dx:-1.3, dy:0}
        var jupiterDrawInst = {radius:11,color :"#d9c08b"}
        var jupiter = new PlanetMover(jupiterCoords,jupiterVel,jupiterDrawInst, 15, sun); 

        var saturnCoords = {x: canvasDims.width/2, y:  canvasDims.height/2+170}
        var saturnVel = {dx:1.3, dy:0}
        var saturnDrawInst = {radius:11,color :"#e3b95f"}
        var saturn = new PlanetMover(saturnCoords,saturnVel,saturnDrawInst, 15, sun); 

        var uranusCoords = {x: canvasDims.width/2+200, y:  canvasDims.height/2}
        var uranusVel = {dx:0, dy:-1.10}
        var uranusDrawInst = {radius:6,color :"#3885a6"}
        var uranus = new PlanetMover(uranusCoords,uranusVel,uranusDrawInst, 5, sun); 

        var neptuneCoords = {x: canvasDims.width/2-210, y:  canvasDims.height/2}
        var neptuneVel = {dx:0, dy:1.10}
        var neptuneDrawInst = {radius:5,color :"#57b5b4"}
        var neptune = new PlanetMover(neptuneCoords,neptuneVel,neptuneDrawInst, 5, sun); 

        var plutoCoords = {x: canvasDims.width/2+350, y:  canvasDims.height/2}
        var plutoVel = {dx:0, dy:-1}
        var plutoDrawInst = {radius:1,color :"#b0fffe"}
        var pluto = new PlanetMover(plutoCoords,plutoVel,plutoDrawInst, .1, sun); 

        this.objects = [sun,mercury,venus,earth,mars,jupiter,saturn,uranus,neptune,pluto];
    }       
    
    render(){
        return(
            <GameBoy name = {"gravityDemo"} gameObjects = {this.objects} canvasDims = {this.canvasDims} backgroundColor ={"#1C191E"} eventOptions = {["drag"]}/>
        )
    }
}

    
   