
export class API {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _resStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then(this._resStatus)
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then(this._resStatus)
  }

  getInitialData() {
    return Promise.all([this.getUserInfo(), this.getCards()]);
  }

  deleteLike(data) {
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._resStatus)
  }

  setLike(data) {
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._resStatus)
  }

  deleteCard(data) {
    return fetch(`${this._url}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._resStatus)
  }

  postCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._resStatus)
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(this._resStatus)
  }

  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._resStatus)
  }

}
