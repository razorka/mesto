export class UserInfo {
  constructor({userName, userProfession, userAvatar}) {
    this._userName = userName;
    this._userProfession = userProfession;
    this._userAvatar = userAvatar;
  }

  getUserInfo() {
    this._user = {
      name: this._userName.textContent,
      profession: this._userProfession.textContent
    };
    return this._user;
  }

  setUserAvatar(data) {
    this._userAvatar.src = data.avatar;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userProfession.textContent = data.about;
    this.setUserAvatar(data);
    this._userAvatar.alt = data.name;
  }

}
