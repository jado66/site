import { Object2D } from "./object2D";

export class PlanetMover extends Object2D{
    constructor (startingCoords, startingVel, imageSrc, mass, attractor){
        super(startingCoords, startingVel, imageSrc,false)
        this.G = 8;
        this.attractor = attractor;
        this.mass = mass;

        this.fDir = {xHat:0,yHat:0};
        this.dist = 0;
        this.startingParams.dist = Math.pow(Math.pow(this.attractor.x-this.x,2)+Math.pow(this.attractor.y-this.y,2),.5); 
        this.fMag = 0;
        this.alive = true;
    }
    attract(){
        this.calcDist();
        if (this.dist <1000)
            return
        this.calcFDir();
        this.calcMag();
        var fX = this.fDir[0]*this.fMag;
        var fY = this.fDir[1]*this.fMag;
        this.ddx = fX/this.mass;
        this.ddy = fY/this.mass;
    }
    calcDist(){
        this.dist = 100*Math.pow(Math.pow(this.attractor.x-this.x,2)+Math.pow(this.attractor.y-this.y,2),.5);
        if (this.dist/100 < this.attractor.radius){
            this.alive= false;
            this.attractor.radius= Math.pow(Math.pow(this.radius,2)+Math.pow(this.attractor.radius,2),.5);
        }
    }
    calcFDir(){
        this.fDir = [(100*(this.attractor.x-this.x))/this.dist,(100*(this.attractor.y-this.y))/this.dist]
    }
    calcMag(){
        this.fMag=(this.G * this.mass * this.attractor.mass) / (this.dist * this.dist);
    }
    reset(){
        super.reset();
        this.alive = true;
    }

    update(callback){
        if (this.alive === false){
            return;
        }
        this.attract();
        
        super.update(callback);

        if (this.screenLoop){
            this.checkScreenLoop();
        } 
    }
    draw(drawCircle){
        if (this.alive === false){
            return;
        }
        super.draw();
        if (drawCircle){
            this.ctx.beginPath();
            this.ctx.arc(this.attractor.x, this.attractor.y, this.startingParams.dist, 0, Math.PI*2, false);
            this.ctx.stroke();   
        }
    }

}