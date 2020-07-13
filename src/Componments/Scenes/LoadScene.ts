import DT from "../../GlobalData/DataConst";
import ResLoader from "../../Tools/ResLoader";
export default class LoadScene extends Laya.Script {
    private m_mainResAry: Array<any> = [
        { url: ResLoader.ATLAS_LOAD_COMP, type: Laya.Loader.ATLAS },
        { url: ResLoader.ATLAS_PLAYER1, type: Laya.Loader.ATLAS },
        { url: ResLoader.PNG_LOAD_BG, type: Laya.Loader.IMAGE }
    ];
    private m_lbPro: Laya.Label;                        //进度标签
    private m_barLoad: Laya.ProgressBar;                //进度条
    private m_lbVer: Laya.Label;                        //版本号标签

    constructor() { super(); }

    onEnable(): void {
        this.m_lbPro = this.owner.getChildByName("pro") as Laya.Label;
        this.m_lbVer = this.owner.getChildByName("ver") as Laya.Label;
        this.m_barLoad = this.owner.getChildByName("bar") as Laya.ProgressBar;

        this.m_lbVer.text = "ver" + DT.VERSION_CODE;
        Laya.loader.load(this.m_mainResAry, Laya.Handler.create(this, this.onComplete), Laya.Handler.create(this, this.onProgress, null, false));
    }

    private onProgress(loadNum: number): void {
        this.m_lbPro.text = "正在加载资源：" + (loadNum * 100).toFixed(0) + "%";
        this.m_barLoad.value = loadNum;
    }

    private onComplete(): void {
        this.m_lbPro.text = "正在读取数据：100%";
        Laya.Scene.open(ResLoader.SCENE_GAME);
    }

    onDisable(): void {
    }
}