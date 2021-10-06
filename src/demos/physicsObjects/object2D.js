export class Object2D{
    constructor(startingCoords, startingVel, drawInstr, clickable){
        this.pi = Math.PI

        this.x = startingCoords.x;
        this.y = startingCoords.y;
        this.dx = startingVel.dx;
        this.dy = startingVel.dy;
        this.ddx = 0;
        this.ddy = 0;
        this.rotation = 0;
        this.angularVel = 0;
        this.startingParams = {
            x : startingCoords.x,
            y : startingCoords.y,
            dx : startingVel.dx,
            dy : startingVel.dy,
            ddx : 0,
            ddy : 0
        }

        this.circleSize = 0;

        this.clickable = clickable;
        this.screenLoop = false;
        this.screenLoopBuffer = 0;
        
        this.ctx = null;

        if (typeof drawInstr === 'string' || drawInstr instanceof String){
            this.isImage = true
            this.image = new Image();
            this.image.src = drawInstr;
        }
        else if (drawInstr == null){

        }
        else{
            this.isImage = false;
            this.radius = drawInstr.radius;
            this.color = drawInstr.color;
            this.startingParams.radius = drawInstr.radius;
            this.startingParams.color = drawInstr.color;
        }
        
    }

    getRad(offset){
        return this.angleToRad(this.rotation + offset) 
    }

    angleToRad(degrees){
        return degrees * (this.pi/180);
    }

    reset(){
        this.x = this.startingParams.x;
        this.y = this.startingParams.y;
        this.dx = this.startingParams.dx;
        this.dy = this.startingParams.dy;
    }

    setContext(ctx){
        this.ctx = ctx;
    }

    setGameBoy(gameBoy){
        this.gameBoy = gameBoy;
    }

    mouseHit(mousePos){
        // alert("test")
        if (mousePos.x >= this.x - this.radius && mousePos.x <= this.x + this.radius*2 &&
            mousePos.y >= this.y - this.radius && mousePos.y <= this.y + this.radius*2){
                return true;

            }
        else{
            // alert(`Mouse:${JSON.stringify(mousePos)}, Sun:{${this.x},${this.y}}`)
            return false;
        }
    }

    update(callback){
        this.x += this.dx;
        this.y += this.dy;
        this.dx += this.ddx;
        this.dy += this.ddy;

        // reset ddx and ddy when no forces are applied
        this.ddx = 0;
        this.ddy = 0;

        this.rotation += this.angularVel;


        if (callback !== undefined){
            callback();
        }
        if (this.screenLoop){
            this.handleScreenLoop();
        }
    }

    handleScreenLoop(){
        if (this.x < 0 - this.screenLoopBuffer){
            this.x = this.ctx.canvas.width + this.screenLoopBuffer;
        }        
        else if (this.x > this.ctx.canvas.width + this.screenLoopBuffer){
            this.x = 0 - this.screenLoopBuffer
        }
        if (this.y < 0 - this.screenLoopBuffer){
            this.y = this.ctx.canvas.height + this.screenLoopBuffer;
        }        
        else if (this.y > this.ctx.canvas.height + this.screenLoopBuffer){
            this.y= 0 - this.screenLoopBuffer
        }
    }

    calcDistance2(point){
        return Math.pow(point.x-this.x,2)+Math.pow(point.y-this.y,2);
    }
    
    draw(){
        if (this.ctx === null){
            alert("Context is null");
            return;
        }
        
        if (this.isImage){
            this.ctx.drawImage(this.image,this.x,this.y)
        }
        else{
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
            this.ctx.closePath();
        }
    }
    log(){
        console.log(`(${this.x},${this.y})`)
    }

}