import "./index.css";

//import {Popup} from '../scripts/Popup.js';
//import {initialCards} from '../scripts/initialCards.js';
import {Section} from '../scripts/Section.js';
import {UserInfo} from '../scripts/UserInfo.js';
import {Card} from '../scripts/Card.js';
import {FormValidator} from '../scripts/FormValidator.js';
import {PopupWithForm} from '../scripts/PopupWithForm.js';
import {PopupWithImage} from '../scripts/PopupWithImage.js';
import {PopupWithConfirm} from '../scripts/PopupWithConfirm.js';
import {API} from '../scripts/API.js';

const popupProfile = document.querySelector(".popup_profile");
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
//const popupProfileCloseButton = document.querySelector(".popup__close-button_profile");

const profileFormNameInput = document.querySelector(".popup__field_name");
const profileFormProfInput = document.querySelector(".popup__field_profession");

const userName = document.querySelector(".profile__name");
const userProfession = document.querySelector(".profile__profession");
const userAvatar = document.querySelector(".profile__avatar");

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

const popupConfirm = document.querySelector(".popup_confirm");

let tempCard = null;
let ownerId = null;

const profileFormValidator = new FormValidator(validationSettings, popupProfile);
const cardFormValidator = new FormValidator(validationSettings, popupAddCard);

//переменная открытия попапа с фото
const photoPopup = new PopupWithImage(popupImage);

//получаем информацию о пользователе
const userInfo = new UserInfo({ userName, userProfession, userAvatar });

//добавляем все карточки из API.
const cardList = new Section({
  renderer: (data) => {
    const card = newCard(data);
    const cardElement = card.generateCard();
    card.likeQuantity(data);
    cardList.addItem(cardElement, 'append');
    }
  }, elementList
);
const api = new API({
  url: 'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {
    authorization: '7f44e8c1-ccbe-472c-9d19-90b75ec42ef5',
    'content-type': 'application/json'
  }
});

api.getInitialData()
  .then((data) => {
    const [userData, cardsData] = data;
    ownerId = userData._id;
    userInfo.setUserInfo(userData);
    cardList.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(err);
  })

//создаем шаблон карточки с функцией открытия попапа изображения
const newCard = (data) => {
  const card = new Card(data, '.card', ownerId, {
    handleCardClick: (data) => {
      photoPopup.open(data);
      photoPopup.setEventListeners();
    },
    deleteCard: (data) => {
      api.deleteCard(data);
      popupWithConfirm.open(data);
    },
    setLike: (data) => {
      api.setLike(data)
        .then((data) => {
          card.likeQuantity(data);
        })
        .catch((err) => {
          console.log(err);
        })
    },
    deleteLike: (data) => {
      api.deleteLike(data)
        .then((data) => {
          card.likeQuantity(data);
        })
        .catch((err) => {
          console.log(err);
        })
    },
  });
  return card;
}


const popupWithConfirm = new PopupWithConfirm(popupConfirm, submitConfirmDelete)

function submitConfirmDelete (data) {
  api.deleteCard(data)
    .then(() => {
      tempCard.deleteCard();
    })
    .then(() => {
      tempCard = null;
      popupWithConfirm.close();
    })
    .catch((err) => {
      console.log(err);
    })
}






//слушатель кнопки открытия попапа добавлени карточек с фото
popupAddCardOpenButton.addEventListener('click', () => {
  addCardPopup.open();
  addCardPopup.setEventListeners();
})


//добавление карточки с данными из полей попапа
const addCardPopup = new PopupWithForm(popupAddCard, submitCallbackCard);

function submitCallbackCard (data) {
  api.postCard(data)
  .then((res) => {
  const card = newCard(res);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    addCardPopup.close();
  })
};

//слушатель кнопки открытия попапа с функцией заполнения данных формы
popupProfileOpenButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  profileFormNameInput.value = userData.name;
  profileFormProfInput.value = userData.profession;
  userInfoPopup.open();
  userInfoPopup.setEventListeners();
})

//сохранение введенных пользователем данных
const userInfoPopup = new PopupWithForm(popupProfile, submitCallback);

function submitCallback (data) {
  userInfo.setUserInfo(data);
  userInfoPopup.close();
};


profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
