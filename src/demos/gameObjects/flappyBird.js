import { Object2D } from "../physicsObjects/object2D";
export class FlappyBird extends Object2D{
    constructor(parent, startingCoords){
        super(startingCoords,{dx:0,dy:0},null);
        this.gravity = .1;
        this.flapping = false;
        this.color = "yellow"
        this.naturalColor = "yellow"
        this.dead = false;
        this.parent = parent;
    }
    update(callback){
        if (this.dy <-6){
            this.dy = -6
        }

        super.update();
        if (this.flapping){
            this.ddy = -10;
        }
        else{
            this.ddy = this.gravity;
        }

        if (this.y > this.ctx.canvas.height){
            this.parent.stopGame();
        }
    }
    flap(){
        if (!this.dead)
             this.flapping = true;
    }

    die(){
        this.color = "red"
        this.dead = true;
    }

    reset(){
        super.reset();
        this.dead = false;
        this.color = this.naturalColor
    }
    draw(){

        // alert(JSON.stringify(this.ctx))
        this.ctx.beginPath();

        // body
        this.ctx.arc(this.x, this.y, 20, 0, Math.PI*2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = "black"
        this.ctx.lineWidth = 4
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        
        var eyePosX = this.x+7;
        var eyePosY = this.y-5;


        // eye
        this.ctx.beginPath();
        this.ctx.arc(eyePosX,eyePosY,7,0,Math.PI*2,false)
        this.ctx.fillStyle = "white";
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();

        // pupil
        this.ctx.beginPath();
        this.ctx.arc(eyePosX+3,eyePosY,3,0,Math.PI*2,false)
        this.ctx.fillStyle = "black";
        this.ctx.fill();
        this.ctx.closePath();

        // beak
        this.ctx.beginPath();
        this.ctx.moveTo(this.x+20,this.y-3);    // Move the pen to (30, 50)
        this.ctx.lineTo(this.x+30,this.y);  // Draw a line to (150, 100)
        this.ctx.lineTo(this.x+20,this.y+4);
        this.ctx.lineTo(this.x+20,this.y+7); 
        this.ctx.fillStyle = "orange";
        this.ctx.fill();
        this.ctx.lineWidth = 1
        this.ctx.stroke();
        this.ctx.closePath();

        var initial = { x: this.x-30, y: this.y-7 };
        var median = { x: this.x-27, y: this.y };
        var final = { x: this.x-20, y: this.y+8};

        var controlX=2*median.x-initial.x/2-final.x/2;
        var controlY=2*median.y-initial.y/2-final.y/2;

        // wing
        this.ctx.beginPath();
        this.ctx.moveTo(this.x-2,this.y+5);
        this.ctx.lineTo(this.x-30,this.y-7); 
        this.ctx.quadraticCurveTo(controlX,controlY,final.x,final.y); 
        this.ctx.lineTo(this.x-2,this.y+10); 
        this.ctx.lineTo(this.x-2,this.y+5);

        this.ctx.lineWidth = 1.5;
        this.ctx.fill();
        this.ctx.stroke();
        
        this.ctx.closePath();

        if (this.flapping){
            this.flapping = false;
        }

    }
}