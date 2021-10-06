import { GameBoy } from '../../components/gameBoy';
import { FlappyManager } from '../gameObjects/flappyManager';
import React from 'react';

export class FlappyBirdDemo extends React.Component{
    constructor(props){
        super(props);

        var canvasDims = {width:1180,height:600};
        
        this.game = new FlappyManager("easy",canvasDims)

        this.objects = [this.game];
    }       

    render(){
        return(
            <GameBoy name = {"flappyBird"} gameObjects = {this.objects} canvasDims = {this.canvasDims} backgroundColor={"#b5cef5"} eventOptions = {["space"]}
                     extraButtons = {[{text:"Easy",onClick:()=>{this.game.changeDifficulty("easy")}},{text:"Medium",onClick:()=>{this.game.changeDifficulty("med")}},{text:"Hard",onClick:()=>{this.game.changeDifficulty("hard")}}]}/>
        )
    }
}

    
   