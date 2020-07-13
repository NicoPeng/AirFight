(function () {
    'use strict';

    class CDataConst {
    }
    CDataConst.VERSION_CODE = "1.0.100.1";
    CDataConst.SERVER_URL = "localhost:9001";
    CDataConst.MONEY_UNIT = 10000;
    CDataConst.INT64_MAX = 9223372036854775807;
    CDataConst.RKT_YESTERDAY = 1;
    CDataConst.RKT_TODAY = 2;
    CDataConst.RKT_CUR_WEEK = 3;
    CDataConst.RKT_CUR_MONTH = 4;

    class ResLoader {
    }
    ResLoader.PNG_LOAD_BG = "load/load.png";
    ResLoader.ATLAS_LOAD_COMP = "res/atlas/comp.atlas";
    ResLoader.ATLAS_PLAYER1 = "res/atlas/player/p1.atlas";
    ResLoader.SCENE_LOAD = "load/LoadScene.scene";
    ResLoader.SCENE_LOBBY = "main/LobbyScene.scene";
    ResLoader.SCENE_GAME = "main/GameScene.scene";
    ResLoader.GAME_PLAYER_ANI = "ani/PlayerAni";
    ResLoader.SOUND_CLOSE_IMG_URL = "";
    ResLoader.SOUND_OPEN_IMG_URL = "";

    class LoadScene extends Laya.Script {
        constructor() {
            super();
            this.m_mainResAry = [
                { url: ResLoader.ATLAS_LOAD_COMP, type: Laya.Loader.ATLAS },
                { url: ResLoader.ATLAS_PLAYER1, type: Laya.Loader.ATLAS },
                { url: ResLoader.PNG_LOAD_BG, type: Laya.Loader.IMAGE }
            ];
        }
        onEnable() {
            this.m_lbPro = this.owner.getChildByName("pro");
            this.m_lbVer = this.owner.getChildByName("ver");
            this.m_barLoad = this.owner.getChildByName("bar");
            this.m_lbVer.text = "ver" + CDataConst.VERSION_CODE;
            Laya.loader.load(this.m_mainResAry, Laya.Handler.create(this, this.onComplete), Laya.Handler.create(this, this.onProgress, null, false));
        }
        onProgress(loadNum) {
            this.m_lbPro.text = "正在加载资源：" + (loadNum * 100).toFixed(0) + "%";
            this.m_barLoad.value = loadNum;
        }
        onComplete() {
            this.m_lbPro.text = "正在读取数据：100%";
            Laya.Scene.open(ResLoader.SCENE_GAME);
        }
        onDisable() {
        }
    }

    class GameScene extends Laya.Script {
        constructor() {
            super();
            this.m_bgPosY = 0;
            this.m_bgBoderY = -1080;
            this.m_moveSpeed = 2;
        }
        onEnable() {
            this.m_imgBg = this.owner.getChildByName("bg");
            Laya.timer.frameLoop(1, this, this.bgRoll);
            this.createPlayer();
            this.owner.on(Laya.Event.CLICK, this, this.onClickFun);
        }
        createPlayer() {
            this.m_sprPlayer = Laya.Pool.getItemByCreateFun("PlayerProfit", this.PlayerProfit.create, this.PlayerProfit);
            this.owner.addChild(this.m_sprPlayer);
        }
        createPlayerBullet() {
            var cell = Laya.Pool.getItemByCreateFun("PlayerBulletProfit", this.PlayerBulletProfit.create, this.PlayerBulletProfit);
            this.owner.addChild(cell);
            cell.pos(this.m_sprPlayer.x, this.m_sprPlayer.y - 50);
        }
        onClickFun() {
            this.createPlayerBullet();
        }
        bgRoll() {
            this.m_bgPosY += this.m_moveSpeed;
            if (this.m_bgPosY >= 0) {
                this.m_bgPosY = this.m_bgBoderY;
            }
            this.m_imgBg.y = this.m_bgPosY;
        }
        setBGSkin() {
        }
        onDisable() {
        }
    }

    class GamePlayer extends Laya.Script {
        constructor() {
            super();
            this.m_skinId = 1;
        }
        onEnable() {
            this.addSkin();
            this.m_ownerSprite = this.owner;
            this.m_ownerSprite.pos(GameConfig.width / 2, GameConfig.height - 100);
        }
        addSkin() {
            if (!this.m_skinAni) {
                this.m_skinAni = new Laya.Animation();
                var aniUrl = this.getSkinAniUrlById();
                this.m_skinAni.loadAnimation(aniUrl);
                this.owner.addChild(this.m_skinAni);
                this.m_skinAni.play();
            }
        }
        getSkinAniUrlById() {
            return ResLoader.GAME_PLAYER_ANI + this.m_skinId + ".ani";
        }
        onDisable() {
        }
    }

    class PlayerBullet extends Laya.Script {
        constructor() {
            super();
            this.m_moveSpeed = 10;
            this.m_bulletBoderY = -30;
        }
        onEnable() {
            this.m_ownerSprite = this.owner;
        }
        onLateUpdate() {
            this.m_ownerSprite.y -= this.m_moveSpeed;
            if (this.m_ownerSprite.y < -this.m_bulletBoderY) {
                this.owner.destroy();
            }
        }
        onDisable() {
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("Componments/Scenes/LoadScene.ts", LoadScene);
            reg("Componments/Scenes/GameScene.ts", GameScene);
            reg("Componments/Prefabs/GamePlayer.ts", GamePlayer);
            reg("Componments/Prefabs/PlayerBullet.ts", PlayerBullet);
        }
    }
    GameConfig.width = 720;
    GameConfig.height = 1080;
    GameConfig.scaleMode = "showall";
    GameConfig.screenMode = "vertical";
    GameConfig.alignV = "middle";
    GameConfig.alignH = "center";
    GameConfig.startScene = "load/LoadScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError = true;
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}());
