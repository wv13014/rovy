export default class GameRecords {
    public jie:number;
    public gameStartTime:string;
    public gameRunTime:string;
    public bestArr:number;

    getTime(){
        const time = + new Date();
        return time;
    }
    getDate(){
        const y:number = new Date().getFullYear();
        const m = new Date().getMonth() + 1;
        const d = new Date().getDate();
        const hr = new Date().getHours();
        const min = new Date().getMinutes();
        const sec = new Date().getSeconds();
        let result:string = y+"年"+m+"月"+d+"日 "+hr+":"+min+":"+sec;
        return result;
    }
}