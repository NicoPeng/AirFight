import ResLoader from "../../Tools/ResLoader";
import GameConfig from "../../GameConfig";

export default class GamePlayer extends Laya.Script {
    private m_skinId = 1;                                                                // 皮肤id 从1开始
    private m_skinAni: Laya.Animation;                                                  // 皮肤动画
    private m_ownerSprite: Laya.Sprite;                                                 // 自己转成sprite
    constructor() { super(); }

    onEnable(): void {
        this.addSkin();

        this.m_ownerSprite = (this.owner as Laya.Sprite);
        this.m_ownerSprite.pos(GameConfig.width / 2, GameConfig.height - 100);
    }

    private addSkin(): void {
        if (!this.m_skinAni) {
            this.m_skinAni = new Laya.Animation();
            var aniUrl = this.getSkinAniUrlById();
            this.m_skinAni.loadAnimation(aniUrl);
            this.owner.addChild(this.m_skinAni);
            this.m_skinAni.play();
        }
    }
    private getSkinAniUrlById(): string {
        return ResLoader.GAME_PLAYER_ANI + this.m_skinId + ".ani";
    }
    onDisable(): void {

    }
}