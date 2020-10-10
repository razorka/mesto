import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor (popupSelector, submitCallback) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__container');
    this._submit = submitCallback;
    this._submitForm = this._submitForm.bind(this);
  }

  _getInputValues() {
    const fieldSetList = Array.from(this._form.querySelectorAll('.popup__field'));
    const data = {};
    fieldSetList.forEach((field) => {
      data[field.name] = field.value;
    })
    return data;
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
