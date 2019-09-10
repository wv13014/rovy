import { ui } from "./../ui/layaMaxUI";
import GameRecords from "./GameRecords";
import RecordModel from "./RecordModel";

export default class GameRestartScene extends ui.gameOverUI {
    constructor() {
        super();
        this.btnRestart.on(Laya.Event.CLICK, this, this.onStart);
    }

    onEnable() {
        let temp = RecordModel.ins.gameRecords.length;
        //最佳游戏记录
        if(RecordModel.ins.gameRecords[1]){
            let num = RecordModel.ins.gameRecords[0].bestArr;
            if(RecordModel.ins.gameRecords[temp - 1].jie > RecordModel.ins.gameRecords[num].jie){
                RecordModel.ins.gameRecords[0].bestArr = temp - 1;
                this.txtBestStartTime.text = RecordModel.ins.gameRecords[temp - 1].gameStartTime;
                this.txtBestRunTime.text = RecordModel.ins.gameRecords[temp - 1].gameRunTime;
                this.txtBestLong.text = "" + RecordModel.ins.gameRecords[temp - 1].jie;
            }
            else{
                this.txtBestStartTime.text = RecordModel.ins.gameRecords[num].gameStartTime;
                this.txtBestRunTime.text = RecordModel.ins.gameRecords[num].gameRunTime;
                this.txtBestLong.text = "" + RecordModel.ins.gameRecords[num].jie;
            }
        }
        else{
            this.txtBestStartTime.text = RecordModel.ins.gameRecords[0].gameStartTime;
            this.txtBestRunTime.text = RecordModel.ins.gameRecords[0].gameRunTime;
            this.txtBestLong.text = "" + RecordModel.ins.gameRecords[0].jie;
            RecordModel.ins.gameRecords[0].bestArr = 0;
        }
        //最后三次游戏记录
        if(RecordModel.ins.gameRecords[temp - 3]){
            this.txtLast1StartTime.text = RecordModel.ins.gameRecords[temp - 3].gameStartTime;
            this.txtLast1RunTime.text = RecordModel.ins.gameRecords[temp - 3].gameRunTime;
            this.txtLast1Long.text = "" + RecordModel.ins.gameRecords[temp - 3].jie;

            this.txtLast2StartTime.text = RecordModel.ins.gameRecords[temp - 2].gameStartTime;
            this.txtLast2RunTime.text = RecordModel.ins.gameRecords[temp - 2].gameRunTime;
            this.txtLast2Long.text = "" + RecordModel.ins.gameRecords[temp - 2].jie;

            this.txtLast3StartTime.text = RecordModel.ins.gameRecords[temp - 1].gameStartTime;
            this.txtLast3RunTime.text = RecordModel.ins.gameRecords[temp - 1].gameRunTime;
            this.txtLast3Long.text = "" + RecordModel.ins.gameRecords[temp - 1].jie;
        }
        else if(RecordModel.ins.gameRecords[temp - 2]){
            this.txtLast1StartTime.text = RecordModel.ins.gameRecords[temp - 2].gameStartTime;
            this.txtLast1RunTime.text = RecordModel.ins.gameRecords[temp - 2].gameRunTime;
            this.txtLast1Long.text = "" + RecordModel.ins.gameRecords[temp - 2].jie;

            this.txtLast2StartTime.text = RecordModel.ins.gameRecords[temp - 1].gameStartTime;
            this.txtLast2RunTime.text = RecordModel.ins.gameRecords[temp - 1].gameRunTime;
            this.txtLast2Long.text = "" + RecordModel.ins.gameRecords[temp - 1].jie;
        }
        else if(RecordModel.ins.gameRecords[temp - 1]){
            this.txtLast1StartTime.text = RecordModel.ins.gameRecords[temp - 1].gameStartTime;
            this.txtLast1RunTime.text = RecordModel.ins.gameRecords[temp - 1].gameRunTime;
            this.txtLast1Long.text = "" + RecordModel.ins.gameRecords[temp - 1].jie;
        }
    }
    onStart() {
        //游戏记录
        let temp = RecordModel.ins.gameRecords.length;
        RecordModel.ins.gameRecords[temp] = new GameRecords();
        RecordModel.ins.gameRecords[temp].gameStartTime = RecordModel.ins.gameRecords[temp].getDate();


        Laya.Scene.open("gameRun.scene");
        //this.visible = false;
        //new RunningGame().runGame();
    }

}