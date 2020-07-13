/**
 * 玩家子弹类
 */
export default class PlayerBullet extends Laya.Script {
    private m_ownerSprite: Laya.Sprite;                                                 // 自己转成sprite
    private m_moveSpeed: number = 10;                                                   // 玩家子弹每帧移动速度
    private m_bulletBoderY = -30;                                                       // 玩家子弹上边界
    constructor() { super(); }

    onEnable(): void {
        this.m_ownerSprite = (this.owner as Laya.Sprite);
    }

    onLateUpdate(): void {
        this.m_ownerSprite.y -= this.m_moveSpeed;
        if (this.m_ownerSprite.y < -this.m_bulletBoderY) {
            this.owner.destroy();
        }
    }

    onDisable(): void {

    }
}