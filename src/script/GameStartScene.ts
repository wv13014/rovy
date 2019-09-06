import { ui } from "./../ui/layaMaxUI";

export default class GameStartScene extends ui.gameStartUI {
    constructor() {
        super();
        this.btnStart.on(Laya.Event.CLICK, this, this.onStart);
    }

    onStart() {   
        Laya.Scene.open("gameRun.scene");
        //this.visible = false;
        //new RunningGame().runGame();
    }

}
