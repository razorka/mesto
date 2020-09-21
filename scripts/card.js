const popupImage = document.querySelector(".popup_image");
const popupImageScreen = popupImage.querySelector(".element__image-screen");
const popupImageName = popupImage.querySelector(".element__image-name");
const popupImageCloseButton = document.querySelector(".popup__close-button_image");

const elementList = document.querySelector(".elements__list");

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

   _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _handleOpenPopup() {
    popupImage.classList.add("popup_opened");;
    popupImageScreen.src = this._link;
    popupImageScreen.alt = "Фото" + this._name;
    popupImageName.textContent = this._name;
  }

  _handleClosePopup() {
    popupImageScreen.src = "";
    popupImageScreen.alt = "";
    popupImageName.textContent = "";
    popupImage.classList.remove('popup_opened');
  }

  _deleteCard(evt) {
    evt.target.parentNode.remove();
  }

  _likeAction(evt) {
    evt.target.classList.toggle("element__like-button_active");
  }

  _setEventListeners() {
    popupImageCloseButton.addEventListener('click', () => {
      this._handleClosePopup()
    });

    this._element.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('element__delete-button')) {
        this._deleteCard(evt)
      }
      else if (evt.target.classList.contains('element__like-button')){
      this._likeAction(evt)
      }
      else if (evt.target.classList.contains('element__image')){
      this._handleOpenPopup(evt)
      }
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__name').alt = "Фото" + this._name;

    return this._element;
  }

}

export {Card};
