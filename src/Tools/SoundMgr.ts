/**
 * 声音播放管理
 */
export default class SoundMgr {

    //音乐标记
    public static curBgMusicTag: string = "";

    //播放背景音乐
    public static playBgMusic(tagName: string, musicPath: string): void {
        if (SoundMgr.curBgMusicTag != tagName) {
            Laya.SoundManager.playMusic(musicPath);
            SoundMgr.curBgMusicTag = tagName;
        }
    }

    //音效
    public static playBtnMusic(musicPath: string, playNum: number = 1): void {
        Laya.SoundManager.playSound(musicPath, playNum);
    }
}