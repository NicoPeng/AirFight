export default class GameScene extends Laya.Script {


    private m_imgBg: Laya.Image;
    private m_bgPosY = 0;                                                               //背景图y坐标
    private m_bgBoderY = -1080;                                                         //背景图实际是用的两张一模一样的图拼接，顶部超出舞台的，向下移动  到达最底部需要重置位置 相当于背景图的初始坐标
    private m_moveSpeed = 2;                                                            //每帧两个像素移动速度
    private m_sprPlayer: Laya.Sprite;

    /** @prop {name:PlayerProfit,tips:"游戏玩家组件战机",type:Prefab}*/
    public PlayerProfit: Laya.Prefab;

    /** @prop {name:PlayerBulletProfit,tips:"游戏玩家组件战机",type:Prefab}*/
    public PlayerBulletProfit: Laya.Prefab;
    constructor() { super(); }

    onEnable(): void {
        this.m_imgBg = this.owner.getChildByName("bg") as Laya.Image;

        Laya.timer.frameLoop(1, this, this.bgRoll);
        this.createPlayer();

        this.owner.on(Laya.Event.CLICK, this, this.onClickFun);
    }
    //玩家角色
    private createPlayer(): void {
        this.m_sprPlayer = Laya.Pool.getItemByCreateFun("PlayerProfit", this.PlayerProfit.create, this.PlayerProfit) as Laya.Sprite;
        this.owner.addChild(this.m_sprPlayer);
    }
    //子弹
    private createPlayerBullet(): void {
        var cell = Laya.Pool.getItemByCreateFun("PlayerBulletProfit", this.PlayerBulletProfit.create, this.PlayerBulletProfit) as Laya.Sprite;
        this.owner.addChild(cell);
        cell.pos(this.m_sprPlayer.x, this.m_sprPlayer.y - 50);
    }

    private onClickFun(): void {
        this.createPlayerBullet();
    }

    //背景循环移动
    private bgRoll(): void {
        this.m_bgPosY += this.m_moveSpeed;
        if (this.m_bgPosY >= 0) {
            this.m_bgPosY = this.m_bgBoderY;
        }
        this.m_imgBg.y = this.m_bgPosY;

    }

    /** 设置背景皮肤 */
    private setBGSkin(): void {

    }
    onDisable(): void {
    }
}