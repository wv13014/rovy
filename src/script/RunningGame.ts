import Snake from "./Snake";
    
export default class RunningGame{    

    snake:Snake[];
    food:Laya.Sprite;

    arrCoordinate:number[][] = new Array(40*40);
    xCoordinate:number;
    yCoordinate:number;

    timer:Laya.Timer;
    gameOver:boolean = false;
    tEat:number;
    tRun:number;
    tIsOver:number;

    runGame() :void{  
        //蛇
        this.snake = [new Snake];
        Laya.stage.addChild(this.snake[0]);
        this.snake[0].graphics.drawRect(0, 0, 10, 10, "#ffff20");
        this.snake[0].y += 40;


        //食物
        this.food = new Laya.Sprite();
        Laya.stage.addChild(this.food);
        this.food.graphics.drawRect(0, 0, 10, 10, "#ffff20");
        //填充食物坐标数组
        for(var x = 0;x < 40;x++){      
                this.arrCoordinate[x] = [(x * 100) + 0,(x * 100) + 1,(x * 100) + 2,(x * 100) + 3,(x * 100) + 4,(x * 100) + 5,(x * 100) + 6,
                    (x * 100) + 7,(x * 100) + 8,(x * 100) + 9,(x * 100) + 10,(x * 100) + 11,(x * 100) + 12,(x * 100) + 13,(x * 100) + 14,
                    (x * 100) + 15,(x * 100) + 16,(x * 100) + 17,(x * 100) + 18,(x * 100) + 19,(x * 100) + 20,(x * 100) + 21,(x * 100) + 22,
                    (x * 100) + 23,(x * 100) + 24,(x * 100) + 25,(x * 100) + 26,(x * 100) + 27,(x * 100) + 28,(x * 100) + 29,(x * 100) + 30,
                    (x * 100) + 31,(x * 100) + 32,(x * 100) + 33,(x * 100) + 34,(x * 100) + 35,(x * 100) + 36,(x * 100) + 37,(x * 100) + 38,
                    (x * 100) + 39];
        } 
        this.pushArr();  

        Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyDown);
        
        // this.tEat = setInterval(this.eat,10);
        // this.tRun = setInterval(this.run,200); 
        // this.tIsOver = setInterval(this.isOver,200);    
        this.timer = new Laya.Timer();
        this.timer.loop(10, this, this.eat, null, false);
        this.timer.loop(200, this, this.run, null, false);
        this.timer.loop(200, this, this.isOver, null, false);
    }

    //控制蛇体
    onKeyDown(e: Event):void {
        var keyCode: number = e["keyCode"];
        if(keyCode == 37 && this.snake[0].fangxiang != 4 && this.snake[0].fangxiang)
            this.snake[0].fangxiang = 3;
        if(keyCode == 38 && this.snake[0].fangxiang != 2)
            this.snake[0].fangxiang = 1;
        if(keyCode == 39 && this.snake[0].fangxiang != 3)
            this.snake[0].fangxiang = 4;
        if(keyCode == 40 && this.snake[0].fangxiang != 1)
            this.snake[0].fangxiang = 2;
    }
    getFangxiang(num:number){
        if(num == 3 && this.snake[0].fangxiang != 4 && this.snake[0].fangxiang)
            this.snake[0].fangxiang = 3;
        if(num == 1 && this.snake[0].fangxiang != 2)
            this.snake[0].fangxiang = 1;
        if(num == 4 && this.snake[0].fangxiang != 3)
            this.snake[0].fangxiang = 4;
        if(num == 2 && this.snake[0].fangxiang != 1)
            this.snake[0].fangxiang = 2;
    }

    //蛇体行走
    run():void{
        //蛇尾
        var xOld = this.snake[0].x;
        var yOld = this.snake[0].y;
        var fOld = this.snake[0].fangxiang;
        for(var i = 1;i < this.snake.length;i++){
            var xTemp = this.snake[i].x;
            var yTemp = this.snake[i].y;
            var fTemp = this.snake[i].fangxiang;
            this.snake[i].x = xOld;
            this.snake[i].y = yOld;
            this.snake[i].fangxiang = fOld;
            xOld = xTemp;
            yOld = yTemp;
            fOld = fTemp; 
        }

        //蛇头
        if(this.snake[0].fangxiang == 1)
            this.snake[0].y -= 10;
        if(this.snake[0].fangxiang == 2)
            this.snake[0].y += 10;
        if(this.snake[0].fangxiang == 3)
            this.snake[0].x -= 10;
        if(!this.snake[0].fangxiang || this.snake[0].fangxiang == 4)
            this.snake[0].x += 10;       
    }

    //吃
    eat():void{
        if(this.snake[0].x == this.xCoordinate && this.snake[0].y == this.yCoordinate + 40){
            //生成蛇新节点
            this.snake[0].jie += 1;
            this.snake[this.snake[0].jie] = new Snake();
            var temp = this.snake[0].jie;
            var xTemp = this.snake[this.snake[0].jie - 1].x;
            var yTemp = this.snake[this.snake[0].jie - 1].y;
            this.snake[temp].graphics.drawRect(0, 0, 10, 10,"#ffff20");
            if(this.snake[temp - 1].fangxiang == 1){
                this.snake[temp].x = xTemp;
                this.snake[temp].y = yTemp + 10;
                this.snake[temp].fangxiang = this.snake[temp - 1].fangxiang;
            }
            if(this.snake[temp - 1].fangxiang == 2){
                this.snake[temp].x = xTemp;
                this.snake[temp].y = yTemp - 10;
                this.snake[temp].fangxiang = this.snake[temp - 1].fangxiang;
            }
            if(this.snake[temp - 1].fangxiang == 3){
                this.snake[temp].x = xTemp + 10;
                this.snake[temp].y = yTemp;
                this.snake[temp].fangxiang = this.snake[temp - 1].fangxiang;
            }
            if(this.snake[temp - 1].fangxiang == 4){
                this.snake[temp].x = xTemp - 10;
                this.snake[temp].y = yTemp;
                this.snake[temp].fangxiang = this.snake[temp - 1].fangxiang;
            }
            Laya.stage.addChild(this.snake[temp]);
            this.pushArr();
        }
    }

    //判断游戏是否结束
    isOver():void{
        if(this.snake[0].x < 0 || this.snake[0].y < 40 || this.snake[0].y > 430 || this.snake[0].x > 390)
            this.gameOver = true;
        for(var i = 1;i < this.snake.length;i++){
            if(this.snake[0].x == this.snake[i].x && this.snake[0].y == this.snake[i].y)
                this.gameOver = true;
        }
        if(this.gameOver){
            // clearInterval(this.tRun);
            // clearInterval(this.tIsOver);
            // clearInterval(this.tEat);
            this.timer.clearAll(this);
            Laya.stage.removeChild(this.food);
            for(var i = 0;true;i++){
                if(this.snake[i])
                    Laya.stage.removeChild(this.snake[i]);
                else
                    break;
            }
            Laya.Scene.open("gameOver.scene");
        } 
    }

    //随机抽取食物坐标
    pushArr():void{
        var x = Math.floor(Math.random()*39);
        var y = Math.floor(Math.random()*39);
        var temp = this.arrCoordinate[x][y];
        this.xCoordinate = Math.floor(temp / 100) * 10;
        for(temp;true;temp -= 100){
            if(temp - 100 < 0){
                this.yCoordinate = temp * 10;
                break;
            }
        }
        this.food.x = this.xCoordinate;
        this.food.y = this.yCoordinate + 40;
    }
}   