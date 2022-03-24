export default class UserInfo {
    constructor({ userNameSelector, userInfoSelector, userAvatarSelector }) {
        this._userNameElement = userNameSelector;
        this._userInfoElement = userInfoSelector;
        this._userAvatarElement = userAvatarSelector;
    }
    userName
    getUserInfo() {
        return {
            name: this._userNameElement.textContent,
            job: this._userInfoElement.textContent,
            avatar: this._userAvatarElement.src
        };
    }

    setUserInfo(name, job) {
        this._userNameElement.textContent = name;
        this._userInfoElement.textContent = job;

    }
    setUserAvatar(avatar) {
        this._userAvatarElement.src = avatar;
    }
}
