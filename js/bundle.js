(function () {
    'use strict';

    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        class gameOverUI extends Laya.Scene {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("gameOver");
            }
        }
        ui.gameOverUI = gameOverUI;
        REG("ui.gameOverUI", gameOverUI);
        class gameRunUI extends Laya.Scene {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("gameRun");
            }
        }
        ui.gameRunUI = gameRunUI;
        REG("ui.gameRunUI", gameRunUI);
        class gameStartUI extends Laya.Scene {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("gameStart");
            }
        }
        ui.gameStartUI = gameStartUI;
        REG("ui.gameStartUI", gameStartUI);
    })(ui || (ui = {}));

    class GameStartScene extends ui.gameOverUI {
        constructor() {
            super();
            this.btnRestart.on(Laya.Event.CLICK, this, this.onStart);
        }
        onStart() {
            Laya.Scene.open("gameRun.scene");
        }
    }

    class Snake extends Laya.Sprite {
        constructor() {
            super();
            this.jie = 0;
            this.cacheAs = "bitmap";
        }
    }

    class RunningGame {
        constructor() {
            this.arrCoordinate = new Array(40 * 40);
            this.gameOver = false;
        }
        runGame() {
            this.snake = [new Snake];
            Laya.stage.addChild(this.snake[0]);
            this.snake[0].graphics.drawRect(0, 0, 10, 10, "#ffff20");
            this.snake[0].y += 40;
            this.food = new Laya.Sprite();
            Laya.stage.addChild(this.food);
            this.food.graphics.drawRect(0, 0, 10, 10, "#ffff20");
            for (var x = 0; x < 40; x++) {
                this.arrCoordinate[x] = [(x * 100) + 0, (x * 100) + 1, (x * 100) + 2, (x * 100) + 3, (x * 100) + 4, (x * 100) + 5, (x * 100) + 6,
                    (x * 100) + 7, (x * 100) + 8, (x * 100) + 9, (x * 100) + 10, (x * 100) + 11, (x * 100) + 12, (x * 100) + 13, (x * 100) + 14,
                    (x * 100) + 15, (x * 100) + 16, (x * 100) + 17, (x * 100) + 18, (x * 100) + 19, (x * 100) + 20, (x * 100) + 21, (x * 100) + 22,
                    (x * 100) + 23, (x * 100) + 24, (x * 100) + 25, (x * 100) + 26, (x * 100) + 27, (x * 100) + 28, (x * 100) + 29, (x * 100) + 30,
                    (x * 100) + 31, (x * 100) + 32, (x * 100) + 33, (x * 100) + 34, (x * 100) + 35, (x * 100) + 36, (x * 100) + 37, (x * 100) + 38,
                    (x * 100) + 39];
            }
            this.pushArr();
            Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyDown);
            this.timer = new Laya.Timer();
            this.timer.loop(10, this, this.eat, null, false);
            this.timer.loop(200, this, this.run, null, false);
            this.timer.loop(200, this, this.isOver, null, false);
        }
        onKeyDown(e) {
            var keyCode = e["keyCode"];
            if (keyCode == 37 && this.snake[0].fangxiang != 4 && this.snake[0].fangxiang)
                this.snake[0].fangxiang = 3;
            if (keyCode == 38 && this.snake[0].fangxiang != 2)
                this.snake[0].fangxiang = 1;
            if (keyCode == 39 && this.snake[0].fangxiang != 3)
                this.snake[0].fangxiang = 4;
            if (keyCode == 40 && this.snake[0].fangxiang != 1)
                this.snake[0].fangxiang = 2;
        }
        getFangxiang(num) {
            if (num == 3 && this.snake[0].fangxiang != 4 && this.snake[0].fangxiang)
                this.snake[0].fangxiang = 3;
            if (num == 1 && this.snake[0].fangxiang != 2)
                this.snake[0].fangxiang = 1;
            if (num == 4 && this.snake[0].fangxiang != 3)
                this.snake[0].fangxiang = 4;
            if (num == 2 && this.snake[0].fangxiang != 1)
                this.snake[0].fangxiang = 2;
        }
        run() {
            var xOld = this.snake[0].x;
            var yOld = this.snake[0].y;
            var fOld = this.snake[0].fangxiang;
            for (var i = 1; i < this.snake.length; i++) {
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
            if (this.snake[0].fangxiang == 1)
                this.snake[0].y -= 10;
            if (this.snake[0].fangxiang == 2)
                this.snake[0].y += 10;
            if (this.snake[0].fangxiang == 3)
                this.snake[0].x -= 10;
            if (!this.snake[0].fangxiang || this.snake[0].fangxiang == 4)
                this.snake[0].x += 10;
        }
        eat() {
            if (this.snake[0].x == this.xCoordinate && this.snake[0].y == this.yCoordinate + 40) {
                this.snake[0].jie += 1;
                this.snake[this.snake[0].jie] = new Snake();
                var temp = this.snake[0].jie;
                var xTemp = this.snake[this.snake[0].jie - 1].x;
                var yTemp = this.snake[this.snake[0].jie - 1].y;
                this.snake[temp].graphics.drawRect(0, 0, 10, 10, "#ffff20");
                if (this.snake[temp - 1].fangxiang == 1) {
                    this.snake[temp].x = xTemp;
                    this.snake[temp].y = yTemp + 10;
                    this.snake[temp].fangxiang = this.snake[temp - 1].fangxiang;
                }
                if (this.snake[temp - 1].fangxiang == 2) {
                    this.snake[temp].x = xTemp;
                    this.snake[temp].y = yTemp - 10;
                    this.snake[temp].fangxiang = this.snake[temp - 1].fangxiang;
                }
                if (this.snake[temp - 1].fangxiang == 3) {
                    this.snake[temp].x = xTemp + 10;
                    this.snake[temp].y = yTemp;
                    this.snake[temp].fangxiang = this.snake[temp - 1].fangxiang;
                }
                if (this.snake[temp - 1].fangxiang == 4) {
                    this.snake[temp].x = xTemp - 10;
                    this.snake[temp].y = yTemp;
                    this.snake[temp].fangxiang = this.snake[temp - 1].fangxiang;
                }
                Laya.stage.addChild(this.snake[temp]);
                this.pushArr();
            }
        }
        isOver() {
            if (this.snake[0].x < 0 || this.snake[0].y < 40 || this.snake[0].y > 430 || this.snake[0].x > 390)
                this.gameOver = true;
            for (var i = 1; i < this.snake.length; i++) {
                if (this.snake[0].x == this.snake[i].x && this.snake[0].y == this.snake[i].y)
                    this.gameOver = true;
            }
            if (this.gameOver) {
                this.timer.clearAll(this);
                Laya.stage.removeChild(this.food);
                for (var i = 0; true; i++) {
                    if (this.snake[i])
                        Laya.stage.removeChild(this.snake[i]);
                    else
                        break;
                }
                Laya.Scene.open("gameOver.scene");
            }
        }
        pushArr() {
            var x = Math.floor(Math.random() * 39);
            var y = Math.floor(Math.random() * 39);
            var temp = this.arrCoordinate[x][y];
            this.xCoordinate = Math.floor(temp / 100) * 10;
            for (temp; true; temp -= 100) {
                if (temp - 100 < 0) {
                    this.yCoordinate = temp * 10;
                    break;
                }
            }
            this.food.x = this.xCoordinate;
            this.food.y = this.yCoordinate + 40;
        }
    }

    class GameRunScene extends ui.gameRunUI {
        constructor() {
            super();
            this.btnUp.on(Laya.Event.CLICK, this, this.onUpClick);
            this.btnDowm.on(Laya.Event.CLICK, this, this.onDowmClick);
            this.btnLeft.on(Laya.Event.CLICK, this, this.onLeftClick);
            this.btnRight.on(Laya.Event.CLICK, this, this.onRightClick);
        }
        onEnable() {
            this.runningGame = new RunningGame;
            this.runningGame.runGame();
        }
        onUpClick() {
            this.runningGame.getFangxiang(1);
        }
        onDowmClick() {
            this.runningGame.getFangxiang(2);
        }
        onLeftClick() {
            this.runningGame.getFangxiang(3);
        }
        onRightClick() {
            this.runningGame.getFangxiang(4);
        }
    }

    class GameStartScene$1 extends ui.gameStartUI {
        constructor() {
            super();
            this.btnStart.on(Laya.Event.CLICK, this, this.onStart);
        }
        onStart() {
            Laya.Scene.open("gameRun.scene");
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("script/GameRestartScene.ts", GameStartScene);
            reg("script/GameRunScene.ts", GameRunScene);
            reg("script/GameStartScene.ts", GameStartScene$1);
        }
    }
    GameConfig.width = 400;
    GameConfig.height = 640;
    GameConfig.scaleMode = "fixedauto";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "gameStart.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = false;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError = true;
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}());
//# sourceMappingURL=bundle.js.map
