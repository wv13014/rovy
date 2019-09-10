import { ui } from "./../ui/layaMaxUI";
import RecordModel from "./RecordModel";
import GameRecords from "./GameRecords";

export default class GameStartScene extends ui.gameStartUI {

    constructor() {
        super();
        this.btnStart.on(Laya.Event.CLICK, this, this.onStart);
    }

    onStart() {
        //游戏记录
        RecordModel.ins.gameRecords = [new GameRecords()];
        RecordModel.ins.gameRecords[0].gameStartTime = RecordModel.ins.gameRecords[0].getDate();

        //打开游戏运行场景
        Laya.Scene.open("gameRun.scene");
        //this.visible = false;
        //new RunningGame().runGame();
    }

}
