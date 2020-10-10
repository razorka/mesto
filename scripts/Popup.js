export class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }

  _closePopupByClick(evt) {
    if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close-button")) {
      this.close();
    }
  }

  _escButtonDown(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", this._closePopupByClick.bind(this));
    document.addEventListener("keydown", this._escButtonDown.bind(this));
  }

  _removeEventListeners() {
    this._popup.removeEventListener("mousedown", this._closePopupByClick.bind(this));
    document.removeEventListener("keydown", this._escButtonDown.bind(this));
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
