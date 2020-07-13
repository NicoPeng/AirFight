import DT from "./DataConst";
import ResLoader from "../Tools/ResLoader";

/**
 * 配置数据类
 * 作用：存储项目中配置信息
 * 注意：
 *     1. 配置可以是从外部文件加载的，也可以直接在当前文件配置，但配置不能过大
 *     2. 导入当前模块时统一简写为DF, import DF from "***";
 */
export default class DataConfig {

    public static elementParams = new Array();             //元素配置信息

}