class Card {
  constructor(data, cardSelector, ownerId, {handleCardClick, deleteCard, setLike, deleteLike}) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._ownerId = ownerId;
    this._handleCardClick = handleCardClick;
    this._deleteCard = deleteCard;
    this._setLike = setLike;
    this._deleteLike = deleteLike;
  }

   _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _likeOn(data) {
    this._likeButton.classList.add("element__like-button_active");
    this._setLike(data);
  }

  _likeOff(data) {
    this._likeButton.classList.remove("element__like-button_active");
    this._deleteLike(data);
  }

  likeQuantity(data) {
    this._photoLikeQuantity.textContent = String(data.likes.length);
 }

  _checkUserCard() {
    if (this._data.owner._id !== this._ownerId) {
      this._deleteButton.remove();
    }
  }

  _checkUserLike() {
    this._data.likes.forEach((likeOwner) => {
      if (likeOwner._id === this._ownerId) {
        this._likeButton.classList.add('element__like-button_active');
      }
    })
  }

  _setEventListeners() {
    this._elementPhoto.addEventListener ('click', () => {
      this._handleCardClick(this._data);
      });

    this._deleteButton.addEventListener ('click', ()=> {
      this._deleteCard(this._data);
    });

    this._likeButton.addEventListener ('click', ()=> {
      if (this._likeButton.classList.contains("element__like-button_active")) {
        this._likeOff(this._data);
      } else {
        this._likeOn(this._data);
      }
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementName = this._element.querySelector('.element__name');
    this._elementPhoto = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._photoLikeQuantity = this._element.querySelector('.element__like-numbers');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._elementPhoto.src = this._data.link;
    this._elementPhoto.alt = "Фото" + this._data.name;
    this._elementName.textContent = this._data.name;
    this._element.setAttribute('id', `a${this._data._id}`);
    this.likeQuantity(this._data)
    this._setEventListeners();
    this._checkUserCard();
    this._checkUserLike();

    return this._element;
  }

}

export {Card};
