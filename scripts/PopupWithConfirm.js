import {Popup} from './Popup.js';

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._form = this._popup.querySelector('popup__confirm');
    this._submit = submitCallback;
    this._submitForm = this._submitForm.bind(this);
  }

  _submitForm(evt) {
    evt.preventDefault();
    this._submit(this._data);
    this._form.removeEventListener('submit', this._submitForm);
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._submitForm);
    super.setEventListeners();
  }

  open(data) {
    this._data = data;
    super.open();
  }
}
