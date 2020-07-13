
/**
 * 资源加载器(负责各种资源加载)
 */
export default class ResLoader {

    public static PNG_LOAD_BG: string = "load/load.png";                                            //加载页背景

    public static ATLAS_LOAD_COMP: string = "res/atlas/comp.atlas";                                 //通用组件资源
    public static ATLAS_PLAYER1: string = "res/atlas/player/p1.atlas";                              //玩家战机皮肤1资源

    public static SCENE_LOAD: string = "load/LoadScene.scene";                                      //加载页
    public static SCENE_LOBBY: string = "main/LobbyScene.scene";                                    //首页
    public static SCENE_GAME: string = "main/GameScene.scene";                                      //游戏

    public static GAME_PLAYER_ANI: string = "ani/PlayerAni";                                        //游戏玩家战机

    public static SOUND_CLOSE_IMG_URL: string = "";                                                 //声音关闭时的图片
    public static SOUND_OPEN_IMG_URL: string = "";                                                  //声音打开时的图片
}