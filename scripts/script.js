import {initialCards} from './initialCards.js';
import {Card} from './card.js';
import {FormValidator} from './validate.js';

const popupProfile = document.querySelector(".popup_profile");
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const popupProfileCloseButton = document.querySelector(".popup__close-button_profile");
const profileFormSaveButton = document.querySelector(".popup__save-button_profile");

const profileFormNameInput = document.querySelector(".popup__field_name");
const profileFormProfInput = document.querySelector(".popup__field_profession");

const userName = document.querySelector(".profile__name");
const userProfession = document.querySelector(".profile__profession");

const popupAddCard = document.querySelector(".popup_card");
const popupAddCardOpenButton = document.querySelector(".profile__submit-button");
const popupAddCardCloseButton = document.querySelector(".popup__close-button_card");
const popupAddCardSaveButton = document.querySelector(".popup__save-button_card");

const placeNameInput = document.querySelector(".popup__field_place-name");
const placeLinkInput = document.querySelector(".popup__field_place-link");

const escButton = "Escape";

//функция закрытия попапа по клику на оверлэй
function closePopupByClick(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}

//функция закрытия попапа при нажатии esc
function escButtonDown(evt) {
  if (evt.key === escButton) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

//функция открытия попапа и слушатели при нажатии мышкой и esc
function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", closePopupByClick);
  document.addEventListener("keydown", escButtonDown);
}

//функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("click", closePopupByClick);
  document.removeEventListener("keydown", escButtonDown);
}

//1. Функция открытия попапа Редактирования профиля.
function openProfilePopup() {
  profileFormNameInput.value = userName.textContent;
  profileFormProfInput.value = userProfession.textContent;
  openPopup(popupProfile);
  //popupValidCheck(popupProfile);
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

//2 Функция открытия попапа для добавления карточек
function openAddCardPopup() {
  placeNameInput.value = placeNameInput.textContent;
  placeLinkInput.value = placeLinkInput.textContent;
  openPopup(popupAddCard);
  //popupValidCheck(popupAddCard);
}

//2.1 Функция закрытия попапа для добавления карточек.
function closeAddCardPopup() {
  closePopup(popupAddCard);
}

initialCards.forEach((data) => {
  const card = new Card(data, '.card');
  const cardElement = card.generateCard();

  document.querySelector('.elements__list').append(cardElement);
});


function saveCard(evt) {
  evt.preventDefault();
  const newElement = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };
  const card = new Card(newElement, '.card');
  const cardElement = card.generateCard();

  document.querySelector('.elements__list').prepend(cardElement)


  closeAddCardPopup();
}


// определяем объект форму - из него в каждой форме сможем выбирать элеметы
const validationSettings = {
  formSelector: ".popup__container",
  fieldsetSelector: ".popup__fieldset",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: ".popup__save-button_disabled",
  inputErrorClass: ".popup__field_type_error",
  errorClass: ".popup__field_error-visible",
  buttonField: ".profile",
  addCardButton: ".profile__submit-button",
  editProfileButton: ".profile__edit-button"
};

const setFormValidation = (settings, formElement) => {
  const formValidator = new FormValidator(settings, formElement);
  formValidator.enableValidation();
}

setFormValidation(validationSettings, popupProfile);
setFormValidation(validationSettings, popupAddCard);


popupProfileOpenButton.addEventListener("click", openProfilePopup);
popupProfileCloseButton.addEventListener("click", closeProfilePopup);
profileFormSaveButton.addEventListener("click", editProfile);
popupAddCardOpenButton.addEventListener("click", openAddCardPopup);
popupAddCardCloseButton.addEventListener("click", closeAddCardPopup);
popupAddCardSaveButton.addEventListener("click", saveCard);
