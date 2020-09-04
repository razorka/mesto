// определяем объект форму - из него в каждой форме сможем выбирать элеметы
const validationSettings = {
  formSelector: '.popup__container',
  fieldsetSelector: '.popup__fieldset',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field_error-visible',
}

//функция отображения нижнего красного подчеркивания полей и текстов ошибок
function showInputError(formElement, inputElement, errorText) {
  const errorElement = formElement.querySelector(`.${inputElement.id}_error`); //определяем span - в нем будет текст ошибки
  inputElement.classList.add(validationSettings.inputErrorClass); //добавяем полю ввода нижнее красное подчеркивание
  errorElement.classList.add(validationSettings.errorClass); //добавляем visible спану с текстом ошибки
  errorElement.textContent = errorText; // текст ошибки в спане
}

//функция скрытия нижнего красного подчеркивания полей и текстов ошибок
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.classList.remove(validationSettings.errorClass);
  errorElement.textContent = '';
}

// функция проверяет форму и inputElement на корректность введённых данных и показывает или скрывает сообщения об ошиках.
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//функция «Есть ли здесь хотя бы одно поле, которое не прошло валидацию?».
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
  }

//функция скрытия и показа кнопки сохранить в случае невалидированного поля
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
  }
}

//функция слушатель - что происходит при вводе данных в поля
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
  };

//функция проверки формы на валидность при открытии попапа
function popupValidCheck(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement);
  });
  toggleButtonState(inputList, buttonElement);
};

//функция валидации
function enableValidation(form) {
  const formList = Array.from(document.querySelectorAll(form.formSelector));
  const fieldsetList = Array.from(document.querySelectorAll(form.fieldsetSelector));

  formList.forEach(formElement => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    fieldsetList.forEach(fieldset => {
      setEventListeners(fieldset);
    });
  })
}

enableValidation(validationSettings);

