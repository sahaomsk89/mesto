export default class UserInfo {
    constructor({ userNameElement, userInfoElement, userAvatarElement }) {
        this._userNameElement = userNameElement;
        this._userInfoElement = userInfoElement;
        this._userAvatarElement = userAvatarElement;
    }

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
