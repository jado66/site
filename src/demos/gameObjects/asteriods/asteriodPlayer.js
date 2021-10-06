import { Object2D } from "../../physicsObjects/object2D";
export class AsteriodsPlayer extends Object2D{
    constructor(parent, startingCoords){
        super(startingCoords,{dx:0,dy:0},null);
        this.level = 1
        this.dead = false;
        this.parent = parent;
        this.thrustPower = .01; //affects velocity from thrust;
        this.bulletSpeed = 1;
        this.bulletDamage = 1;

        this.circleSize = 9;

	    this.agility = 1; //affects turn speed
	    this.breakPower= 1;

        this.angularVel = 0;

        this.debug = false;

        this.leftIsDown = false;
        this.rightIsDown = false;
        this.upIsDown = false;

        this.screenLoop = true;
        this.screenLoopBuffer = 5;

        this.drawPath = [[0, 6], [6, -6], [2, -3], [-2, -3], [-6, -6], [0, 6]];
        this.drawFlamePath1 = [[-2, -3], [-2, -13], [ 0, -6], [ 2, -13], [2, -3]];
        this.drawFlamePath2 = [[-2, -3], [-4,  -9], [-1, -7], [ 1, -14], [2, -3]];
        this.drawFlamePath3 = [[-2, -3], [-1, -14], [ 1, -7], [ 4,  -9], [2, -3]];            
                            
    }



    accelerate(){
        var rot = this.rotation + 90;
        this.dx+=(1 * this.thrustPower * Math.cos(this.pi / 180.0 * rot));
        this.dy+=(1 * this.thrustPower * Math.sin(this.pi / 180.0 * rot));
    }

    update(callback){
        super.update();

        if (this.rightIsDown){
            this.rotation += this.agility;
        }
        if (this.leftIsDown){
            this.rotation -= this.agility;
        }
        if (this.upIsDown){
            this.accelerate();
        }
    }

    die(){
        this.dead = true;
        this.parent.stopGame();
    }

    reset(){
        super.reset();
    }
    draw(){
       
        this.ctx.lineWidth = 1  ;  
        this.ctx.strokeStyle = "white"


        if (this.debug){
            // debug text
            // this.font = '48px serif';
            // this.ctx.textAlign = "center"
            // this.ctx.fillStyle = "white";  //<======= here
            // this.ctx.fillText(this.upIsDown,this.x,this.y-20);
            
            // debug center of mass
            this.ctx.beginPath();
            this.ctx.moveTo(this.x,this.y+10);
            this.ctx.lineTo(this.x,this.y-10);
            this.ctx.moveTo(this.x+10,this.y);
            this.ctx.lineTo(this.x-10,this.y);
            this.ctx.stroke();
            this.ctx.arc(this.x, this.y, this.circleSize, 0, Math.PI*2, false);
            this.ctx.stroke();
            this.ctx.closePath();

        }
        
        this.ctx.save()

        this.ctx.translate(this.x,this.y);
        this.ctx.rotate(this.angleToRad(this.rotation))

        this.ctx.beginPath();

        this.ctx.moveTo(this.drawPath[0][0],this.drawPath[0][1]);

        for (var i = 1; i < this.drawPath.length; i++){
            this.ctx.lineTo(this.drawPath[i][0],this.drawPath[i][1])
        }

        this.ctx.stroke();

        if (this.upIsDown){
            var randomFlamePathNum = Math.floor(Math.random()*3)+1;

            var flamePath = (randomFlamePathNum === 1? this.drawFlamePath1:(randomFlamePathNum === 2? this.drawFlamePath2: this.drawFlamePath3));

            this.ctx.moveTo(flamePath[0][0],flamePath[0][1]);
            for (var i = 1; i < flamePath.length; i++){
                this.ctx.lineTo(flamePath[i][0],flamePath[i][1])
            }
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