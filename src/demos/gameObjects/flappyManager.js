import { FlappyBird } from "./flappyBird";
import { Pipe } from "./pipe";

export class FlappyManager{
    constructor(difficulty, canvasDims){
        this.canvasDims =canvasDims;
        this.bird = new FlappyBird(this,{x:this.canvasDims.width/2,y:this.canvasDims.height/2});

        this.startingX = 3*this.canvasDims.width/4;
        this.spacing = 250;
        this.gap = 300;
        this.difficulty = difficulty;

        this.pipes = [];
        this.startingPipeCount = 2;

        this.isThereAnActionOnSpace = true;


    }
    setContext(ctx){
        // alert("manger ctx" +JSON.stringify(ctx))
        this.ctx =ctx;
        this.bird.setContext(this.ctx);
        

        this.setUpDemo();

        // alert(JSON.stringify(this.ctx))

    }

    setGameBoy(gameBoy){
        this.gameBoy = gameBoy;
    }

    changeDifficulty(diff, force =false){
        
        if (diff === this.difficulty && !force){
            return;
        }
        else{
            this.difficulty = diff;
        }
        // alert(diff)
        switch(diff){
            case "easy":
                this.gap = 300;
                this.bird.color = "yellow";
                this.bird.naturalColor = "yellow"
                this.gameBoy.backgroundColor = "#b5cef5"
                break;
            case "med":
                this.gap = 240;
                this.bird.color = "orange";
                this.bird.naturalColor = "orange"
                this.gameBoy.backgroundColor = "#6d99de"
                break;
            case "hard":
                this.bird.color = "blue";
                this.bird.naturalColor = "blue"
                this.gameBoy.backgroundColor = "#2f5287"
                this.gap = 200;
                break;
        }
        if(this.gameBoy.state.hasStarted === false){
            this.gameBoy.stopDemo();
        }
    }

    setUpDemo(){
        this.pipes = []

        for (var i = 0; i < this.startingPipeCount; i++){
            var bottomPipe = new Pipe(this,{x:this.startingX+this.spacing*i,y:(this.canvasDims.height-this.gap)/2+this.gap},this.bird,this.spacing,true) 
            var topPipe = new Pipe(this,{x:this.startingX+this.spacing*i,y:(this.canvasDims.height-this.gap)/2},this.bird,this.spacing,false)
            bottomPipe.setContext(this.ctx)
            topPipe.setContext(this.ctx)
            this.pipes.push(bottomPipe);
            this.pipes.push(topPipe);

        }
    }
    reset(){
        this.bird.reset();
        this.changeDifficulty(this.difficulty)
        // alert("reset")
        this.pipes = []
        this.setUpDemo();
        // this.setUpDemo();
    }

    stopGame(){
        this.gameBoy.stopDemo();
    }

    actionOnSpace(){
        this.bird.flap();
    }

    createNewPipeCallBack(){
        // alert(JSON.stringify(this))
        var randomHeight =Math.floor(Math.random()*(this.canvasDims.height-this.gap-20))+this.gap+20
        var bottomPipe = new Pipe(this,{x:this.canvasDims.width,y:randomHeight},this.bird,this.spacing,true) 
        var topPipe = new Pipe(this,{x:this.canvasDims.width,y:randomHeight-this.gap},this.bird,this.spacing,false)
        bottomPipe.setContext(this.ctx)
        topPipe.setContext(this.ctx)
        this.pipes.push(bottomPipe);
        this.pipes.push(topPipe);
        // this.pipes.push(new Pipe(this,{x:this.canvasDims.width,y:randomHeight},this.ctx,this.bird,this.spacing,true))
        // this.pipes.push(new Pipe(this,{x:this.canvasDims.height,y:randomHeight-this.gap},this.ctx,this.bird,this.spacing,false))
    };

    deletePipeCallback(){
        this.pipes.shift()
        this.pipes.shift()
    }

    draw(){
        // alert("hi")
        this.pipes.forEach(pipe=>{
            pipe.draw();
        })
        this.bird.draw();

    }

    update(){
        this.bird.update();
        this.pipes.forEach(pipe=>{
            pipe.update();
        })

        // this.draw();

    }

}