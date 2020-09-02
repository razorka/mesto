const popupProfile = document.querySelector('.popup_profile');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfileCloseButton = document.querySelector('.popup__close-button_profile');
const profileFormSaveButton = document.querySelector('.popup__save-button_profile');

const profileFormNameInput = document.querySelector('.popup__field_name');
const profileFormProfInput = document.querySelector('.popup__field_profession');

const userName = document.querySelector('.profile__name');
const userProfession = document.querySelector('.profile__profession');


const popupAddCard = document.querySelector('.popup_card');
const popupAddCardOpenButton = document.querySelector('.profile__submit-button');
const popupAddCardCloseButton = document.querySelector('.popup__close-button_card');
const popupAddCardSaveButton = document.querySelector('.popup__save-button_card');

const placeNameInput = document.querySelector('.popup__field_place-name');
const placeLinkInput = document.querySelector('.popup__field_place-link');

const popupImage = document.querySelector('.popup_image');
const popupImageScreen = popupImage.querySelector('.element__image-screen');
const popupImageName = popupImage.querySelector('.element__image-name');
const popupImageCloseButton = document.querySelector('.popup__close-button_image');

const elementList = document.querySelector('.elements__list');


function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//1. Функция открытия попапа Редактирования профиля.
function openProfilePopup() {
  profileFormNameInput.value = userName.textContent;
  profileFormProfInput.value = userProfession.textContent;
  openPopup(popupProfile);
}

//1.1 Переменная с Функцией закрытия попапа Редактирования профиля.
function closeProfilePopup() {
  closePopup(popupProfile);
}

//1.2 Функция редактирования и сохранения данных профиля.
function editProfile(evt) {
  evt.preventDefault();
  userName.textContent = profileFormNameInput.value;
  userProfession.textContent = profileFormProfInput.value;
  closeProfilePopup();
}

//2 Функция открытия попапа для добавления карточек.
function openAddCardPopup() {
  placeNameInput.value = placeNameInput.textContent;
  placeLinkInput.value = placeLinkInput.textContent;
  openPopup(popupAddCard);
}

//2.1 Функция закрытия попапа для добавления карточек.
function closeAddCardPopup() {
  closePopup(popupAddCard);
}

function deleteCard(evt) {
  evt.target.parentNode.remove();
};

function likeAction(evt){
  evt.target.classList.toggle('element__like-button_active');
};

function closePopupImage() {
  closePopup(popupImage);
 };

 function openFullImage(evt){
  openPopup(popupImage);
  popupImageScreen.src = evt.target.src;
  popupImageScreen.alt = evt.target.alt;
  popupImageName.textContent = evt.target.parentNode.querySelector('.element__name').textContent;
};


//Функция создания карточки
function createCard(link, name) {
  const card = document.querySelector('.card').content.cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  const cardName = card.querySelector('.element__name');
  const cardDeleteButton = card.querySelector('.element__delete-button');
  const cardLikeButton = card.querySelector('.element__like-button');

  cardImage.src = link;
  cardImage.alt = 'Фото' + name;
  cardName.textContent = name;

  cardDeleteButton.addEventListener('click', deleteCard);
  cardLikeButton.addEventListener('click', likeAction);
  cardImage.addEventListener('click', openFullImage);
  popupImageCloseButton.addEventListener('click', closePopupImage);

  return card;
}

  //5. Создадим функцию стартового добавления карточек в блок.
function initCards() {
  initialCards.forEach((element) => {
    const cardLink = element.link;
    const cardName = element.name;
    elementList.append(createCard(cardLink, cardName));
  })
}
initCards();

  //6. Функция добавления новой карточки.
function saveCard(evt) {
  evt.preventDefault();
  const newElement = {
    name:(placeNameInput.value),
    link:(placeLinkInput.value)
  }
  const newTemplate = createCard(newElement.link, newElement.name);
  elementList.prepend(newTemplate);
  closeAddCardPopup();
}

popupProfileOpenButton.addEventListener('click', openProfilePopup);
popupProfileCloseButton.addEventListener('click', closeProfilePopup);
profileFormSaveButton.addEventListener('click', editProfile);
popupAddCardOpenButton.addEventListener('click', openAddCardPopup);
popupAddCardCloseButton.addEventListener('click', closeAddCardPopup);
popupAddCardSaveButton.addEventListener('click', saveCard);



const validationSettings = {
  formSelector: '.popup__container',
  fieldsetSelector: '.popup__fieldset',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field_error-visible',
}


function getErrorElement(form, field) {
  return form.querySelector(`#${field.id}_error`);
}

function showInputError(form, field, errorText) {
  const errorElement = getErrorElement(form, field);
  field.classList.add(validationSettings.inputErrorClass);
  errorElement.textContent = errorText;
  errorElement.classList.add(validationSettings.errorClass);
}

function hideInputError(formElement, inputElement) {
  const errorElement = getErrorElement(formElement, inputElement);
  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(validationSettings.errorClass);
}

function hasInvalidInput(formInputs) {
  return formInputs.some(inputElement => {
    return !inputElement.validity.valid;
  })
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function toggleSubmitButtonState(formInputs, formSubmitButton) {
  if (hasInvalidInput(formInputs)) {
    formSubmitButton.disabled = true;
    formSubmitButton.classList.add(validationSettings.inactiveButtonClass);
  } else {
    formSubmitButton.disabled = false;
    formSubmitButton.classList.remove(validationSettings.inactiveButtonClass);
  }
}

function inputEventListener(evt) {
  const formElement = evt.target.form;
  const inputElement = evt.srcElement;
  const formInputs = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const formSubmitButton = formElement.querySelector(validationSettings.submitButtonSelector);
  checkInputValidity(formElement, inputElement);
  toggleSubmitButtonState(formInputs, formSubmitButton);
}

function openCheckValidity(formElement) {
  const formInputs = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const formSubmitButton = formElement.querySelector(validationSettings.submitButtonSelector);
  formInputs.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement);
  });
  toggleSubmitButtonState(formInputs, formSubmitButton);
};

function setEventListeners(formElement) {
  const formInputs = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const formSubmitButton = formElement.querySelector(validationSettings.submitButtonSelector);
  toggleSubmitButtonState(formInputs, formSubmitButton);
  formInputs.forEach(inputElement => {
    inputElement.addEventListener('input', inputEventListener);
  })
}

function enableValidation(settingsObject) {
  const formsList = Array.from(document.querySelectorAll(settingsObject.formSelector));
  formsList.forEach(formElement => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })
    const fieldsetList = Array.from(formElement.querySelectorAll(settingsObject.fieldsetSelector));
    fieldsetList.forEach(fieldset => {
      setEventListeners(fieldset);
    })
  })
}

enableValidation(validationSettings);

