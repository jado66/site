import { GameBoy } from '../../components/gameBoy';
import { AsteriodManager } from '../gameObjects/asteriods/asteriodsManager';
import React from 'react';

export class AsteriodDemo extends React.Component{
    constructor(props){
        super(props);

        var canvasDims = {width:1180,height:600};
        
        this.game = new AsteriodManager(canvasDims);

        this.objects = [this.game];

    }       

    render(){
        return(
            <GameBoy name = {"asteriods"} gameObjects = {this.objects} canvasDims = {this.canvasDims} backgroundColor={"black"} eventOptions = {["space","left","right","up"]}
                    />
        )
    }
}
// extraButtons = {[{text:"Left",onClick:()=>{this.game.changeDifficulty("easy")}},{text:"Level",onClick:()=>{this.game.changeDifficulty("med")}},{text:"Right",onClick:()=>{this.game.changeDifficulty("hard")}}]}
    
   