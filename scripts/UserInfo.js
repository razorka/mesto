export class UserInfo {
  constructor({userName, userProfession}) {
    this._userName = userName;
    this._userProfession = userProfession;
  }

  getUserInfo() {
    this._user = {
      name: this._userName.textContent,
      profession: this._userProfession.textContent
    };
    return this._user;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userProfession.textContent = data.profession;
  }

}
