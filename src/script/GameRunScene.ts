import { ui } from "./../ui/layaMaxUI";
import RunningGame from "./RunningGame";

export default class GameRunScene extends ui.gameRunUI {

    runningGame:RunningGame;

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
    onUpClick(){
        this.runningGame.getFangxiang(1);
    }
    onDowmClick(){
        this.runningGame.getFangxiang(2);
    }
    onLeftClick(){
        this.runningGame.getFangxiang(3);
    }
    onRightClick(){
        this.runningGame.getFangxiang(4);
    }

}
