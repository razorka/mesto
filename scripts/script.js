import {openPopup, closePopup} from './utils.js';
import {initialCards} from './initialCards.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const popupProfile = document.querySelector(".popup_profile");
const formProfile = document.querySelector(".popup__container_profile");
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const popupProfileCloseButton = document.querySelector(".popup__close-button_profile");
//const profileFormSaveButton = document.querySelector(".popup__save-button_profile");

const profileFormNameInput = document.querySelector(".popup__field_name");
const profileFormProfInput = document.querySelector(".popup__field_profession");

const userName = document.querySelector(".profile__name");
const userProfession = document.querySelector(".profile__profession");

const popupAddCard = document.querySelector(".popup_card");
const formAddCard = document.querySelector(".popup__container_card");
const popupAddCardOpenButton = document.querySelector(".profile__submit-button");
const popupAddCardCloseButton = document.querySelector(".popup__close-button_card");
//const popupAddCardSaveButton = document.querySelector(".popup__save-button_card");

const placeNameInput = document.querySelector(".popup__field_place-name");
const placeLinkInput = document.querySelector(".popup__field_place-link");

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

const profileFormValidator = new FormValidator(validationSettings, popupProfile);
const cardFormValidator = new FormValidator(validationSettings, popupAddCard);

//1. Функция открытия попапа Редактирования профиля.
function openProfilePopup() {
  profileFormNameInput.value = userName.textContent;
  profileFormProfInput.value = userProfession.textContent;
  openPopup(popupProfile);
  profileFormValidator.resetForm();
}

//1.2 Функция редактирования и сохранения данных профиля.
function editProfile(evt) {
  evt.preventDefault();
  userName.textContent = profileFormNameInput.value;
  userProfession.textContent = profileFormProfInput.value;
  closePopup(popupProfile);
}

//2 Функция открытия попапа добавления карточек
function openAddCardPopup() {
  placeNameInput.value = "";
  placeLinkInput.value = "";
  openPopup(popupAddCard);
  cardFormValidator.resetForm();
}


initialCards.forEach((data) => {
  const card = new Card(data, '.card');
  const cardElement = card.generateCard();

  elementList.append(cardElement);
});


function saveCard(evt) {
  evt.preventDefault();
  const newElement = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };
  const card = new Card(newElement, '.card');
  const cardElement = card.generateCard();

  elementList.prepend(cardElement)


  closePopup(popupAddCard);
}

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

popupProfileOpenButton.addEventListener("click", openProfilePopup);
popupProfileCloseButton.addEventListener("click", () => closePopup(popupProfile));
formProfile.addEventListener("submit", editProfile);
popupAddCardOpenButton.addEventListener("click", openAddCardPopup);
popupAddCardCloseButton.addEventListener("click", () => closePopup(popupAddCard));
formAddCard.addEventListener("submit", saveCard);
