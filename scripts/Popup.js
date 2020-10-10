export class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closePopupByClick = this._closePopupByClick.bind(this);
  }

  _closePopupByClick(evt) {
    if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close-button")) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", this._closePopupByClick);
    document.addEventListener("keydown", this._handleEscClose);
  }

  _removeEventListeners() {
    this._popup.removeEventListener("mousedown", this._closePopupByClick);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  open () {
    this.setEventListeners;
    this._popup.classList.add("popup_opened");
  }

  close () {
    this._removeEventListeners;
    this._popup.classList.remove("popup_opened");
  }

}
