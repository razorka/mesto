class FormValidator {
  constructor(validationSettings, formElement) {
    this._validationSettings = validationSettings;
    this._formElement = formElement;
  }

  _findErrorElement(inputElement) {
    return this._formElement.querySelector(`.${inputElement.id}_error`);
  }

  //функция отображения нижнего красного подчеркивания полей и текстов ошибок
  _showInputError(inputElement, errorText, errorElement) {
    inputElement.classList.add(this._validationSettings.inputErrorClass); //добавяем полю ввода нижнее красное подчеркивание
    errorElement.classList.add(this._validationSettings.errorClass); //добавляем visible спану с текстом ошибки
    errorElement.textContent = errorText; // текст ошибки в спане
  }

  //функция скрытия нижнего красного подчеркивания полей и текстов ошибок
  _hideInputError(inputElement) {
    this._errorElement = this._findErrorElement(inputElement);
    inputElement.classList.remove(this._validationSettings.inputErrorClass);
    this._errorElement.classList.remove(this._validationSettings.errorClass);
    this._errorElement.textContent = "";
  }

  // функция проверяет форму и inputElement на корректность введённых данных и показывает или скрывает сообщения об ошиках.
  _checkInputValidity = (inputElement) => {
    this._errorElement = this._findErrorElement(inputElement);

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage, this._errorElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  //функция «Есть ли здесь хотя бы одно поле, которое не прошло валидацию?».
  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  //функция скрытия и показа кнопки сохранить в случае невалидированного поля
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._validationSettings.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._validationSettings.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  //функция проверки формы на валидность при открытии попапа
  resetForm() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });

    this._toggleButtonState();
  }

  _inputEventListener(evt) {
    const inputElement = evt.target;
    this._checkInputValidity(inputElement);
    this._toggleButtonState();
  }

  //функция слушатель - что происходит при вводе данных в поля
  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationSettings.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._validationSettings.submitButtonSelector);
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        this._inputEventListener(evt, this._inputList, this._buttonElement);
      });
    });
    this.resetForm();
  }

  //функция валидации
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(
      this._formElement.querySelectorAll(this._validationSettings.fieldsetSelector)
    );

    fieldsetList.forEach((fieldset) => {
      this._setEventListeners(fieldset);
    });
  }
}

export {FormValidator};
