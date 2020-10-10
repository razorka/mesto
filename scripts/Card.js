class Card {
  constructor(data, cardSelector,  {handleCardClick}) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

   _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _likeAction(evt) {
    evt.target.classList.toggle("element__like-button_active");
  }

  _setEventListeners() {
    this._elementPhoto.addEventListener ('click', () => {
      this._handleCardClick(this._data);
      });

    this._element.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('element__delete-button')) {
        this._deleteCard(evt)
      }
      else if (evt.target.classList.contains('element__like-button')){
      this._likeAction(evt)
      }
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementName = this._element.querySelector('.element__name');
    this._elementPhoto = this._element.querySelector('.element__image');
    this._elementPhoto.src = this._data.place_link;
    this._elementPhoto.alt = "Фото" + this._data.place_name;
    this._elementName.textContent = this._data.place_name;
    this._setEventListeners();

    return this._element;
  }

}

export {Card};
