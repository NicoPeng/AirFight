export namespace dm {
    /** Properties of a UserData. */
    /** 用户游戏数据 需要修改 */
    export class IUserData {
        /** UserPublicInfo uid */
        uid: number = 0;
        nickName: string = '';
        avatarUrl: string = '';
        wxappShareImg: string = '';
        loginTime: number = 0;
        status: number = 0;
        created_at: string = '';
        updated_at: string = '';
    }

    /** 用户信息 需要修改 */
    export class IUserInfo {

        uid: number = 0;
        nickName: string = '';
        avatarUrl: string = '';
        wxappShareImg: string = '';
        loginTime: number = 0;
        status: number = 0;
        created_at: string = '';
        updated_at: string = '';
    }
    /** 游戏数据 */
    export class IGameData {
        userData: IUserData = new IUserData();
        userInfo: IUserInfo = new IUserInfo();
        token: string = '';
        offLineTime: number = 0;
        sysTime: number = 1581944092;
    }
}