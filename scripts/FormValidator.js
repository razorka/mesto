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
  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._validationSettings.inputErrorClass);
    errorElement.classList.remove(this._validationSettings.errorClass);
    errorElement.textContent = "";
  }

  // функция проверяет форму и inputElement на корректность введённых данных и показывает или скрывает сообщения об ошиках.
  _checkInputValidity = (inputElement) => {
    const errorElement = this._findErrorElement(inputElement);

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage, errorElement);
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  };

  //функция «Есть ли здесь хотя бы одно поле, которое не прошло валидацию?».
  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  //функция скрытия и показа кнопки сохранить в случае невалидированного поля
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._validationSettings.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._validationSettings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  //функция проверки формы на валидность при открытии попапа
  resetForm(formElement, buttonElement) {
    const buttonsField = document.querySelector(this._validationSettings.buttonField);
    buttonsField.addEventListener('click', (evt) => {
      if (evt.target.classList.contains(this._validationSettings.addCardButton) || evt.target.classList.contains(this._validationSettings.editProfileButton)) {
        formElement.forEach((inputElement) => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState(formElement, buttonElement);
        });
      }
    })
  }

  _inputEventListener(evt, formElement, buttonElement) {
    const inputElement = evt.target;
   this._checkInputValidity(inputElement);
    this._toggleButtonState(formElement, buttonElement);
  }

  //функция слушатель - что происходит при вводе данных в поля
  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(this._validationSettings.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        this._inputEventListener(evt, inputList, buttonElement);
      });
    });
    this.resetForm(inputList, buttonElement);
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
