import { Object2D } from "../../physicsObjects/object2D";
export class AsteriodRock extends Object2D{
    constructor(parent, startingCoords, startingVel, size,id){
        super(startingCoords,startingVel, null);
        this.dead = false;
        this.parent = parent;
        this.size = size;
        this.id = id;

        // do random stuff per sizes here
        switch(size){
            case "small":
                this.health = 3;
                this.drawPath = [[-5, 9],  [4, 8],   [8, 4],   
                                [8, -5],  [-2, -8], [-2, -3], 
                                [-8, -4], [-8, 4],  [-5, 10]];
                this.angularVel = Math.random()*6-3;
                this.screenLoopBuffer = 10;
                this.circleSize = 15;
                break;
            case "med":
                this.health = 10;
                this.drawPath = [[2, 8],    [8, 15],    [12, 8], 
                                [6, 2],    [12, -6],   [2, -15],
                                [-6, -15], [-14, -10], [-15, 0],
                                [-4, 15],  [2, 8]]
                this.angularVel = Math.random()*3-1.5;
                this.screenLoopBuffer = 15;
                this.circleSize = 20;
                break;
            case "large":
                this.health = 20;
                this.drawPath = [[0, 12],    [8, 20], [16, 14],
                                [10, 12],   [20, 0], [0, -20],
                                [-18, -10], [-20, -2], [-20, 14],
                                [-10, 20],  [0, 12]]
                this.dx = Math.random() - .5// random(-2.1, 2.1));
            	this.dy = Math.random() - .5//random(-2.1, 2.1));
                this.angularVel = Math.random()*1.5-.75;
                this.screenLoopBuffer = 20;
                this.circleSize = 23;
                break;
        }


        this.debug = false;

        this.screenLoop = true;



    }
    takeDamage(amount){
        this.health -= amount;
        if (this.health <= 0 && !this.dead){
            this.die();
            if (this.size === "large"){
                this.parent.spawnMedRocks(this);
            }
            else if (this.size === "med"){
                this.parent.spawnSmallRocks(this);
            }
        }
    }
  
    die(){
        this.dead = true;
    }

    reset(){
        super.reset();
    }
    draw(){

        if (this.dead){
            return;
        }
         
        // alert(JSON.stringify(this.ctx))
       
        this.ctx.lineWidth = 1  ;  
        this.ctx.strokeStyle = "white"


        if (this.debug){
       
            
            this.font = '48px serif';
            this.ctx.textAlign = "center"
            this.ctx.fillStyle = "white";  //<======= here
            this.ctx.fillText(this.id,this.x,this.y)

            // debug center of mass
            this.ctx.beginPath();
            // this.ctx.moveTo(this.x,this.y+10);
            // this.ctx.lineTo(this.x,this.y-10);
            // this.ctx.moveTo(this.x+10,this.y);
            // this.ctx.lineTo(this.x-10,this.y);
            // this.ctx.stroke();
            this.ctx.arc(this.x, this.y, this.circleSize, 0, Math.PI*2, false);
            this.ctx.stroke();
            this.ctx.closePath();

        }
        
        


        this.ctx.save()


        this.ctx.translate(this.x,this.y);
        this.ctx.rotate(this.angleToRad(this.rotation))
   
        this.ctx.beginPath();

        // Instructions here
        this.ctx.moveTo(this.drawPath[0][0],this.drawPath[0][1]);

        for (var i = 1; i < this.drawPath.length; i++){
            this.ctx.lineTo(this.drawPath[i][0],this.drawPath[i][1])
        }

        this.ctx.stroke();
        this.ctx.closePath();  
        this.ctx.translate(-this.x,-this.y);

        this.ctx.restore();


    }
}

// void Ship::applyThrust()
// {
// 	int rot = getRotation() + 90;
// 	float power = thrustPower;
// 	velocity.addDx(THRUST_AMOUNT * power * cos(3.14159265359 / 180.0 * rot));
// 	velocity.addDy(THRUST_AMOUNT * power * sin(3.14159265359 / 180.0 * rot));
// }

// void Ship::applyBreaks()
// {
// 	int rot = getRotation() + 90;
// 	float breaks = getBreakPower();

// 	float newDx = velocity.getDx() - breaks * (cos(3.14159265359 / 180.0 * rot));
// 	float newDy = velocity.getDy() - breaks * (sin(3.14159265359 / 180.0 * rot));
// 	std::cout << newDx << " ,  " << newDy << "\n";
// 	velocity.setDx(newDx);
// 	velocity.setDy(newDy);

// 	if (velocity.getSpeed() < 0)
// 	{
// 		velocity.setDx(0);
// 		velocity.setDy(0);
// 	}
// }

// ultra simple point
// struct PT
// {
//    int x;
//    int y;
// };

// // draw the ship                                                 
// const PT pointsShip[] = 
// { // top   r.wing   r.engine l.engine  l.wing    top
//    {0, 6}, {6, -6}, {2, -3}, {-2, -3}, {-6, -6}, {0, 6}  
// };

// glBegin(GL_LINE_STRIP);
// for (int i = 0; i < sizeof(pointsShip)/sizeof(PT); i++)
// {
//    Point pt(center.getX() + pointsShip[i].x, 
//             center.getY() + pointsShip[i].y);
//    rotate(pt, center, rotation);
//    glVertex2f(pt.getX(), pt.getY());
// }
// glEnd();

// // draw the flame if necessary
// if (thrust)
// {
//    const PT pointsFlame[3][5] =
//    {
//       { {-2, -3}, {-2, -13}, { 0, -6}, { 2, -13}, {2, -3} },
//       { {-2, -3}, {-4,  -9}, {-1, -7}, { 1, -14}, {2, -3} },
//       { {-2, -3}, {-1, -14}, { 1, -7}, { 4,  -9}, {2, -3} }
//    };
   
//    glBegin(GL_LINE_STRIP);
//    glColor3f(1.0 /* red % */, 0.0 /* green % */, 0.0 /* blue % */);
//    int iFlame = random(0, 3);
//    for (int i = 0; i < 5; i++)
//    {
//       Point pt(center.getX() + pointsFlame[iFlame][i].x, 
//                center.getY() + pointsFlame[iFlame][i].y);
//       rotate(pt, center, rotation);
//       glVertex2f(pt.getX(), pt.getY());
//    }
//    glColor3f(1.0, 1.0, 1.0); // reset to white                                  
//    glEnd();