import * as dataBundles from "./DataBundles";
import DT from "./DataConst";
/**
 * 数据中心存储类
 * 作用：存储项目中全局变量
 * 注意：
 *     1. 所有数据不要声明成static静态常量
 *     2. 需要初始化的变量请写在initData函数中
 *     3. public变量不需要加m_前缀，private变量必须加m_前缀
 *     4. 当前类内可以写部分功能函数
 *     5. 导入当前模块时统一简写为DC, import DC from "***";
 */
export default class DataCenter extends Laya.Script {

    private static m_inst: DataCenter = null;

    public redirectGateURL: string = "";                                                        //重定向的网关地址

    public selfInfo: dataBundles.dm.IGameData = new dataBundles.dm.IGameData();                 //自身信息

    /** 构造函数 */
    constructor() {
        super();
    }

    /** 全局单例 */
    public static get inst(): DataCenter {
        if (DataCenter.m_inst == null) {
            DataCenter.m_inst = new DataCenter();
            DataCenter.m_inst.init();
        }
        return DataCenter.m_inst;
    }

    /** 初始化函数 */
    private init(): void {
        Laya.SoundManager.autoReleaseSound = false;
    }

    /** 获取网关地址 */
    public getServerURL(): string {
        if(this.redirectGateURL.length > 0) {
            return this.redirectGateURL;
        }
        return DT.SERVER_URL;
    }
}

