import { AsteriodsPlayer } from "./asteriodPlayer";
import { AsteriodRock } from "./asteriodRock";
import { AsteriodBullet } from "./bullet";

export class AsteriodManager{
    constructor(canvasDims){
        this.canvasDims =canvasDims;
        this.user = new AsteriodsPlayer(this,{x:this.canvasDims.width/2,y:this.canvasDims.height/2});

        this.level = 1;

        this.enemies = [];
        this.bullets = [];

        this.isThereAnActionOnSpace = true;
       

    }
    
    actionOnLeftKeyDown() {this.user.leftIsDown = true}//callback
    actionOnRightKeyDown()  {this.user.rightIsDown = true}//
    actionOnLeftKeyUp(){this.user.leftIsDown = false}//}
    actionOnRightKeyUp(){this.user.rightIsDown = false}
    actionOnUpKeyUp(){this.user.upIsDown = false}
    actionOnUpKeyDown(){this.user.upIsDown = true}


    setContext(ctx){
        this.ctx =ctx;
        this.user.setContext(this.ctx);

        this.setUpDemo();

    }

    setGameBoy(gameBoy){
        this.gameBoy = gameBoy;
    }

    changeLevel(level){
        this.level = level;
        this.user.setLevel(level);
    }

    spawnLargeRock(){
        var id = this.enemies.length;
        var startingPos = {x:Math.random()*this.ctx.canvas.width,y:Math.random()*this.ctx.canvas.height};
        var newRock = new AsteriodRock(this,startingPos,{dx:0,dy:0}, "large",id);
        newRock.setContext(this.ctx)
        this.enemies.push(newRock);
    }

    spawnMedRocks(largeRock){
        var startingX = largeRock.x;
        var startingY = largeRock.y;
        var startingDx = largeRock.dx;
        var startingDy = largeRock.dy;

        var numberOfRocks = Math.floor(Math.random()*2)+2;

        for (var i = 0; i< numberOfRocks; i++){
            var id = this.enemies.length;
            var x = Math.random()*20-10 + startingX;
            var y = Math.random()*20-10 + startingY;
            var dx = Math.random()*1-.5 + startingDx;
            var dy = Math.random()*1-.5 + startingDy;

            var newRock = new AsteriodRock(this,{x:x,y:y},{dx:dx,dy:dy},"med",id)
            newRock.setContext(this.ctx);
            this.enemies.push(newRock);
        }
    }
    spawnSmallRocks(medRock){
        var startingX = medRock.x;
        var startingY = medRock.y;
        var startingDx = medRock.dx;
        var startingDy = medRock.dy;

        var numberOfRocks = Math.floor(Math.random()*2)+2;

        for (var i = 0; i< numberOfRocks; i++){
            var id = this.enemies.length;
            var x = Math.random()*20-10 + startingX;
            var y = Math.random()*20-10 + startingY;
            var dx = Math.random()*1-.5 + startingDx;
            var dy = Math.random()*1-.5 + startingDy;

            var newRock = new AsteriodRock(this,{x:x,y:y},{dx:dx,dy:dy},"small",id)
            newRock.setContext(this.ctx);
            this.enemies.push(newRock);
        }
    }

    spawnBullet(){
        var startingPos = {x:this.user.x,y:this.user.y};
        var startingVel = {dx:this.user.dx,dy:this.user.dy};

        startingVel.dx += Math.cos(this.user.getRad(90)) * this.user.bulletSpeed;
        startingVel.dy += Math.sin(this.user.getRad(90)) * this.user.bulletSpeed;
        // alert(JSON.stringify(startingVel))
        
        var newBullet = new AsteriodBullet(this,startingPos, startingVel);
        newBullet.setContext(this.ctx)
        this.bullets.push(newBullet);
    }

    handlePlayerCollisions(){
        this.enemies.forEach(enemy=>{
            if (!enemy.dead){  
                var hit = this.checkForHit(enemy,this.user)
                if (hit){
                    // alert("hit by "+enemy.id)
                    this.user.die()
                }
            }
        })
    }

    handleBulletCollisions(){
        this.bullets.forEach(bullet=>{
            if (!bullet.dead){                
                this.enemies.forEach(enemy=>{
                    if (!bullet.dead){ 
                        var hit = this.checkForHit(bullet,enemy);
                        if (hit){
                            // alert("hit")
                            bullet.die()
                            enemy.takeDamage(this.user.bulletDamage)
                        };
                    }
                })
            }
        })
    }

    checkForHit(object1,object2){
        var dist2 = object1.calcDistance2({x:object2.x,y:object2.y})
        var circles2 = Math.pow(object1.circleSize,2)+Math.pow(object2.circleSize,2);
        
        return (dist2 < circles2)
    }

    setUpDemo(){
        this.enemies = []

        for (var i = 0; i < 5; i++){
            this.spawnLargeRock();
        }
        // create random asteriods
    }
    reset(){
        this.user.reset();

        this.setUpDemo();
    }

    stopGame(){
        this.gameBoy.stopDemo();
    }

    actionOnSpace(){
        // alert("spawn bullet")
        this.spawnBullet();
    }

    changeLevel(incrementLevelBool){
        if (incrementLevelBool){
            if (this.level != 10){
                this.level++;
            }
        }
        else {
            if (this.level != 0){
                this.level++;
            }
        }
    }

    draw(){
        this.enemies.forEach(enemy=>{
            enemy.draw();
        })
        this.bullets.forEach(bullet=>{
            bullet.draw();
        })
        this.user.draw();

    }

    update(){
        this.enemies.forEach(enemy=>{
            enemy.update();
        })
        this.bullets.forEach(bullet=>{
            bullet.update();
        })
        this.user.update();
        this.handlePlayerCollisions();
        this.handleBulletCollisions();
    }

}