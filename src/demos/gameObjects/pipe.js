import { Object2D } from "../physicsObjects/object2D";


export class Pipe extends Object2D{
    constructor(parent,startingCoords,bird,spacing,isBottom){
        super(startingCoords,{dx:-1.8,dy:0},null);
        this.parent = parent;
        this.color = "green";
        this.width = 60;
        this.topHeight = 20;
        this.bird = bird
        this.triggeredNewPipe = false;
        this.spacing = spacing;
        this.isBottom = isBottom;
        this.y2 = 0;
    }

    update(){

        super.update()
       
        if (this.bird.x +20 > this.x && this.bird.x-20<=this.x+this.width){
            if (this.checkForHit()){
                this.bird.die(); 
            }
        }
        else{
        }
        
        if (this.isBottom){
            if ((Math.abs((this.ctx.canvas.width-this.spacing) - this.x) < 1 ) && this.triggeredNewPipe === false){
                this.parent.createNewPipeCallBack();
                this.triggeredNewPipe = true;
            }
            else if (this.x+this.width < 0){
                
                this.parent.deletePipeCallback();
            }
        }
        
    }

    setContext(ctx){
        super.setContext(ctx);
        this.y2 = (this.isBottom?this.ctx.canvas.height:1)
    }

    checkForHit(){
        // function checkOverlap(R, Xc, Yc, X1, Y1, X2, Y2)
        var birdR = 20
    
        // Find the nearest polet on the
        // rectangle to the center of
        // the circle
        var xNearest = Math.max(this.x, Math.min(this.bird.x, this.width+this.x));
        if (this.isBottom)
            var yNearest = Math.max(this.y, Math.min(this.bird.y, this.y2));
        else
            var yNearest = Math.max(this.y2, Math.min(this.bird.y, this.y));

        // Find the distance between the
        // nearest polet and the center
        // of the circle
        // Distance between 2 polets,
        // (x1, y1) & (x2, y2) in
        // 2D Euclidean space is
        // ((x1-x2)**2 + (y1-y2)**2)**0.5
        let dX = xNearest - this.bird.x;
        let dY = yNearest - this.bird.y;
        return (dX * dX + dY * dY) <= birdR * birdR;
    }

    draw(){
        if (this.isBottom){
            this.ctx.beginPath();
            this.ctx.moveTo(this.x,this.y);    // Move the pen to (30, 50)
            this.ctx.lineTo(this.x,this.y+this.topHeight);  // Draw a line to (150, 100)
            this.ctx.lineTo(this.x+2,this.y+this.topHeight);
            this.ctx.lineTo(this.x+2+this.width,this.y+this.topHeight);
            this.ctx.fill()
            this.ctx.stroke();
            this.ctx.moveTo(this.x+2,this.y+this.topHeight)
            this.ctx.lineTo(this.x+2,this.ctx.canvas.height);
            
            this.ctx.lineTo(this.x+this.width,this.ctx.canvas.height);

            this.ctx.lineTo(this.x+this.width,this.y+this.topHeight);
            this.ctx.lineTo(this.x+this.width+2,this.y+this.topHeight);
            this.ctx.lineTo(this.x+this.width+2,this.y)

            this.ctx.lineTo(this.x,this.y);

            this.ctx.fillStyle = this.color;
            this.ctx.fill();
            this.ctx.lineWidth = 1
            this.ctx.stroke();
            this.ctx.closePath();
        }
        else{
            this.ctx.beginPath();
            this.ctx.moveTo(this.x,this.y);    // Move the pen to (30, 50)
            this.ctx.lineTo(this.x,this.y-this.topHeight);  // Draw a line to (150, 100)
            this.ctx.lineTo(this.x+2,this.y-this.topHeight);
            this.ctx.lineTo(this.x+2+this.width,this.y-this.topHeight);
            this.ctx.fill()
            this.ctx.stroke();
            this.ctx.moveTo(this.x+2,this.y-this.topHeight)
            this.ctx.lineTo(this.x+2,0);
            
            this.ctx.lineTo(this.x+this.width,0);

            this.ctx.lineTo(this.x+this.width,this.y-this.topHeight);
            this.ctx.lineTo(this.x+this.width+2,this.y-this.topHeight);
            this.ctx.lineTo(this.x+this.width+2,this.y)

            this.ctx.lineTo(this.x,this.y);

            this.ctx.fillStyle = this.color;
            this.ctx.fill();
            this.ctx.lineWidth = 1
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }
}

