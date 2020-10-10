import "./index.css";

//import {openPopup, closePopup} from '../scripts/utils.js';
//import {Popup} from '../scripts/Popup.js';
import {initialCards} from '../scripts/initialCards.js';
import {Section} from '../scripts/Section.js';
import {UserInfo} from '../scripts/UserInfo.js';
import {Card} from '../scripts/Card.js';
import {FormValidator} from '../scripts/FormValidator.js';
import {PopupWithForm} from '../scripts/PopupWithForm.js';
import {PopupWithImage} from '../scripts/PopupWithImage.js';

const popupProfile = document.querySelector(".popup_profile");
//const formProfile = document.querySelector(".popup__container_profile");
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
//const popupProfileCloseButton = document.querySelector(".popup__close-button_profile");

const profileFormNameInput = document.querySelector(".popup__field_name");
const profileFormProfInput = document.querySelector(".popup__field_profession");

const userName = document.querySelector(".profile__name");
const userProfession = document.querySelector(".profile__profession");

const popupAddCard = document.querySelector(".popup_card");
//const formAddCard = document.querySelector(".popup__container_card");
const popupAddCardOpenButton = document.querySelector(".profile__submit-button");
//const popupAddCardCloseButton = document.querySelector(".popup__close-button_card");
//const popupAddCardSaveButton = document.querySelector(".popup__save-button_card");

//const placeNameInput = document.querySelector(".popup__field_place-name");
//const placeLinkInput = document.querySelector(".popup__field_place-link");

const elementList = document.querySelector(".elements__list")

// определяем объект форму - из него в каждой форме сможем выбирать элеметы
const validationSettings = {
  formSelector: ".popup__container",
  fieldsetSelector: ".popup__fieldset",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__field_error-visible",
  buttonField: ".profile",
  addCardButton: ".profile__submit-button",
  editProfileButton: ".profile__edit-button"
};

const popupImage = document.querySelector(".popup_image");

const profileFormValidator = new FormValidator(validationSettings, popupProfile);
const cardFormValidator = new FormValidator(validationSettings, popupAddCard);



//переменная открытия попапа с фото
const photoPopup = new PopupWithImage(popupImage);

//создаем шаблон карточки с функцией открытия попапа изображения
const newCard = (data) => {
  const card = new Card(data, '.card', {
    handleCardClick: (data) => {
      photoPopup.open(data);
      photoPopup.setEventListeners();
    }
  });
  return card;
}

// отрисовываем все карточки из массива.
const cardList = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = newCard(data);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement, 'append');
    }
  }, elementList
);

cardList.renderItems();

//слушатель кнопки открытия попапа добавлени карточек с фото
popupAddCardOpenButton.addEventListener('click', () => {
  addCardPopup.open();
  addCardPopup.setEventListeners();
})


//добавление карточки с данными из полей попапа
const addCardPopup = new PopupWithForm(popupAddCard, {
  submit: (data) => {
    const card = newCard(data);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
    addCardPopup.close();
  }
})


//получаем информацию о пользователе
const userInfo = new UserInfo({ userName, userProfession });

//слушатель кнопки открытия попапа с функцией заполнения данных формы
popupProfileOpenButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  profileFormNameInput.value = userData.name;
  profileFormProfInput.value = userData.profession;
  userInfoPopup.open();
  userInfoPopup.setEventListeners();
})

//сохранение введенных пользователем данных
const userInfoPopup = new PopupWithForm(popupProfile, {
  submit: (data) => {
    userInfo.setUserInfo(data);
    userInfoPopup.close();
  }
})

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
