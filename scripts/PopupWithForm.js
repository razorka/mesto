import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor (popupSelector, submitCallback) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__container');
    this._submit = submitCallback;
    this._submitForm = this._submitForm.bind(this);
    this._submitButton = this._form.querySelector('.popup__save-button');
  }

  _getInputValues() {
    const fieldSetList = Array.from(this._form.querySelectorAll('.popup__field'));
    const data = {};
    fieldSetList.forEach((field) => {
      data[field.name] = field.value;
    })
    return data;
  }

  renderLoading(Loading, initialDownloadMessage = 'Cохранение...') {
    if (Loading) {
      this._submitButton.textContent = initialDownloadMessage;
    } else {
      this._submitButton.textContent = this._initialValueSubmitButton;
    }
  }

  _submitForm(evt) {
    evt.preventDefault();
    this._submit(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  }

  close() {
    super.close();
    this._form.reset();
    this._form.removeEventListener('submit', this._submitForm);
  }

}
