import { Object2D } from "../../physicsObjects/object2D";
export class AsteriodBullet extends Object2D{
    constructor(parent, startingCoords, startingVel){
        super(startingCoords,startingVel, null);
        
        // alert(JSON.stringify(startingCoords))

        this.dead = false;
        this.parent = parent;
        
        this.debug = false;
        this.screenLoop = false;

    }
  
    die(){
        this.dead = true;
    }

    reset(){
        super.reset();
    }
    draw(){
        // alert()
        if (!this.dead){
            this.ctx.lineWidth = 1  ;  
            this.ctx.strokeStyle = "white" 
       
            this.ctx.beginPath();
     
            this.ctx.arc(this.x, this.y, 1, 0, Math.PI*2, false);
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }
}