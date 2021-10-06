import { Object2D } from "./object2D";

export class StarAttractor extends Object2D{
    constructor (startingCoords, startingVel, imageSrc,mass,draggable){
        super(startingCoords, startingVel, imageSrc, true)
        this.draggable = draggable;
        this.mass = mass;
        // this.image.addEventListener('click', function (e) {
        //     alert("click")
        // });
    }
    
}