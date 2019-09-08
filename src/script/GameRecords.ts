export default class GameRecords {
    public jie:number;
    private year:number = new Date().getFullYear();
    private  month:number = new Date().getMonth();
    public gameStartTime:string;
    public gameRunTime:string;
}