import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._popupPhoto = this._popup.querySelector(".element__image-screen");
    this._popupPhotoName = this._popup.querySelector(".element__image-name");
  }

  open(data) {
    this._popupPhoto.src = data.place_link;
    this._popupPhoto.alt = `Фото ${data.place_name}`;
    this._popupPhotoName.textContent = data.place_name;
    super.open();
  }

}
