/**
 * 常量类
 * 作用：存储项目中使用的常量
 * 注意：
 *     1. 资源相关的常量请统一存放到ResLoader中
 *     2. 命名全部使用大写，每个单词之间用下划线连接
 *     3. 全部声明为public static静态常量
 *     4. 所有数据必须初始化
 *     5. 导入当前模块时统一简写为DT, import DT from "***";
 */
export default class CDataConst {

    public static VERSION_CODE = "1.0.100.1";                                                           //版本号
    public static SERVER_URL: string = "localhost:9001";                                                //服务器地址 后面想改成联网的
    public static MONEY_UNIT = 10000;                                                                   //金额单位                             
    public static INT64_MAX = 9223372036854775807;                                                      //INT64最大数字

    //排行类型 TODO: 用来做一个分数排行之类的，需要服务器 (RankType->RKT)
    public static RKT_YESTERDAY = 1;					                                                //昨日排行
    public static RKT_TODAY = 2;					                                                    //今日排行
    public static RKT_CUR_WEEK = 3;					                                                    //当前周排行
    public static RKT_CUR_MONTH = 4;					                                                //当前月排行

}