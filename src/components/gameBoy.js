import { useStopwatch } from 'react-timer-hook';
import React, { useEffect, useRef } from 'react';
import { AdvButton } from './advButton';
import {Stopwatch} from './stopwatch'
export class GameBoy extends React.Component{
    constructor(props){

      super(props);

      // this.ctx = this.canvas.getContext('2d');
      this.backgroundColor = props.backgroundColor;
      // alert(`Game objects are ${JSON.stringify(props.gameObjects)}`)

      this.state = {
        name: props.name,
        loopFunctionID:0,
        isPaused:true,
        gameObjects:props.gameObjects,
        draggedObject: null,
        time:new Date(),
        hasStarted:false,
        setIntervalID:0,
        stopwatchState:"reset",
        canvasDims:props.canvasDims,
        mouseCoords:{x:0,y:0},
      }

      this.extraButtonProps = props.extraButtons;

      this.canvasEventOptions = props.eventOptions;
      // alert(JSON.stringify(this.canvasEventOptions))

      this.clickableObjects = []
      this.actionOnSpaceObjects = []
      
        // create a list of clickable objects from props.objects
        props.gameObjects.forEach(object=>{
          if (object.clickable){
            // alert("Adding clickable object")
            this.clickableObjects.push(object);
          }
        })
        props.gameObjects.forEach(object=>{
          if (object.isThereAnActionOnSpace){
            // alert("Adding space action object")
            this.actionOnSpaceObjects.push(object);
          }
        })


        // // this.initializeGameboy = this.initializeGameboy.bind(this);
      // this.canvasRef = React.useRef(null);
    }

    addCanvasEvents(){
      var cRect = this.canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
      var demoComponent = this;

      // If drag is an option
      if (this.canvasEventOptions.includes("drag")){

        var clickableObjects = this.clickableObjects;
        var draggedObject = this.draggedObject;

        this.canvas.addEventListener("mouseup",function(e){
          
          demoComponent.setState({draggedObject:null});
        });

        this.canvas.addEventListener("mousedown",function(e){
          if (demoComponent.state.hasStarted === false)
            return
          var canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
          var canvasY = Math.round(e.clientY - cRect.top);  
          
          // this.clickableObjects.length

          for (var i = 0; i < clickableObjects.length; i++){
            if (clickableObjects[i].mouseHit({x:canvasX,y:canvasY})){
              if (clickableObjects[i].draggable){
                demoComponent.setState({draggedObject:clickableObjects[i]});
                break;
              }
            }
          }
          // draggedObject = null;
        })
      
        this.canvas.addEventListener("mousemove", function(e) { 
          var canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
          var canvasY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make 
          demoComponent.state.mouseCoords.x = canvasX;
          demoComponent.state.mouseCoords.y = canvasY; 

          if (demoComponent.state.draggedObject == null || demoComponent.state.draggedObject == undefined){
            return;

          }
          // alert(`Mouse move (${canvasX},${canvasY})`)
          demoComponent.state.draggedObject.x = canvasX;
          demoComponent.state.draggedObject.y = canvasY;
            // ctx.clearRect(0, 0, canvas.width, canvas.height);  // (0,0) the top left of the canvas
            
        });
      }

      // If space is an option
      if (this.canvasEventOptions.includes("space")){
        window.addEventListener('keydown',(e)=>{
          if(e.key === " "|| e.key === "Spacebar"){
            e.preventDefault();
            this.actionOnSpaceObjects.forEach(object=>{
              object.actionOnSpace();
            })
          }
        })
      }

      // alert(this.canvasEventOptions.includes("left"))

      if (this.canvasEventOptions.includes("left")){
        // alert("adding left events")
        window.addEventListener('keydown',(e)=>{
          if(e.key === "ArrowLeft"|| e.key === "A"){
            e.preventDefault();
            demoComponent.state.gameObjects[0].actionOnLeftKeyDown();
          }
        })
        window.addEventListener('keyup',(e)=>{
          if(e.key === "ArrowLeft"|| e.key === "A"){
            e.preventDefault();
            demoComponent.state.gameObjects[0].actionOnLeftKeyUp();
          }
        })
      }
      if (this.canvasEventOptions.includes("right")){
        window.addEventListener('keydown',(e)=>{
          if(e.key === "ArrowRight"|| e.key === "D"){
            e.preventDefault();
            demoComponent.state.gameObjects[0].actionOnRightKeyDown();
          }
        })
        window.addEventListener('keyup',(e)=>{
          if(e.key === "ArrowRight"|| e.key === "D"){
            e.preventDefault();
            demoComponent.state.gameObjects[0].actionOnRightKeyUp();
          }
        })
      }
      if (this.canvasEventOptions.includes("up")){
        window.addEventListener('keydown',(e)=>{
          if(e.key === "ArrowUp"|| e.key === "W"){
            e.preventDefault();
            demoComponent.state.gameObjects[0].actionOnUpKeyDown();
          }
        })
        window.addEventListener('keyup',(e)=>{
          if(e.key === "ArrowUp"|| e.key === "W"){
            e.preventDefault();
            demoComponent.state.gameObjects[0].actionOnUpKeyUp();
          }
        })
      }
    }
        

    async componentDidMount() {

      this.canvas = document.getElementById(`${this.state.name}Canvas`)
      this.ctx = this.canvas.getContext('2d');

      if (this.canvas === undefined){
        alert(`${this.state.name}Canvas is undefined`)
      }
      else if (this.canvas === null){
        alert(`${this.state.name}Canvas is undefined`)
      }
      else{
        // alert(JSON.stringify(this.ctx))
      }

      // alert("Gameboy ctx"+JSON.stringify(this.ctx))
      this.initializeObjects();       
      
    }

    initializeObjects(){
      this.state.gameObjects.forEach(object=>{
        object.setContext(this.ctx);
        object.setGameBoy(this) // set a connection to the gameboy
        object.draw();
      })
     }

    pauseDemo = () => {
      this.setState({isPaused: true,stopwatchState:"pause"});
    }

    drawCanvas = (shouldAlert) =>{
      // if (shouldAlert)
      // alert(`There are ${this.state.gameObjects.length} objects I will be drawing`)
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

      this.state.gameObjects.forEach(object=>{
        object.draw()
      })
    }
    updateCanvas = () =>{
      
      if (this.state.isPaused){
        this.drawCanvas();
        return;
      }
  
      // alert(`${this.state.gameObjects.length}`)

      this.state.gameObjects.forEach(object=>{
        object.update()
      })
  
      this.drawCanvas();
    }
    startContinueDemo = () =>{
      // fix from here
      // alert(JSON.stringify(this.state))
      if (this.state.hasStarted === false){ // Start demo
        //start
        this.setState({isPaused: false,hasStarted:true,stopwatchState:"start"});
        var setIntervalID = setInterval(this.updateCanvas, 10);
        this.setState({setIntervalID:setIntervalID})

        this.addCanvasEvents();

      }
      else{
        if (this.state.isPaused){
          this.setState({isPaused:false,stopwatchState:"resume"})
        }
        else{
          this.pauseDemo()
        }
      }
      
    }
    stopDemo = () =>{
      clearInterval(this.state.setIntervalID);

      this.setState({isPaused:true,hasStarted:false,setIntervalID:0,stopwatchState:"reset"})
      this.state.gameObjects.forEach(object=>{
        object.reset()
      })
      this.drawCanvas();
    }
    render(){
      var canvasName = `${this.state.name}Canvas`;
      var extraButtons = null;
      if (this.extraButtonProps){
        extraButtons = this.extraButtonProps.map((button) =>
        <AdvButton key = {this.state.name+button.text} onClick = {button.onClick} width={"150px"} height={"50px"} text = {button.text}></AdvButton>
        );
      }
     
      return(
      <div className="demoDiv div3DBottom" style={{width:"1202px", border:"1px solid #EEE4E8", backgroundColor:"#4BB2B9", marginRight:"auto", marginLeft:"auto", borderRadius:"10px"}} >
        <div style={{position:"relative"}}>
          <canvas id = {canvasName} className="div3DTop" width="1180px" height="600px" style={{border:"1px solid white", backgroundColor:this.backgroundColor, margin:"10px", borderRadius:"10px"}} />
          <div style={{position:"absolute",color:'white',top:20,right:20, fontSize:"20px"}}>
            <Stopwatch stopwatchState={this.state.stopwatchState}/>
          </div>
       
        </div>
          <div style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly", marginBottom:"14px"}}>
          <AdvButton onClick = {this.startContinueDemo} width={"150px"} height={"50px"} text = {this.state.isPaused?(!this.state.hasStarted?"Start":"Continue"):"Pause"}></AdvButton>
          <AdvButton onClick = {()=>{this.stopDemo();}} width={"150px"} height={"50px"} text = {"Stop" }></AdvButton>
          {extraButtons!= null && extraButtons}
          </div>      
      </div>
    )
  }
}

