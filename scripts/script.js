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

const escButton = 'Escape';
//const overLay = document.querySelector('.popup');
//const overLayProfile = document.querySelector('.popup_profile');
//const overLayCards = document.querySelector('.popup_card');
//const overLayImage = document.querySelector('.popup_image');
//const popupOpenClass = document.querySelector('.popup_opened');

//функция закрытия попапа по клику на оверлэй
function closePopupByClick(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target)
  };
}

//функция закрытия попапа при нажатии esc
function escButtonDown(evt) {
  if (evt.key === escButton) {
    const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup)
  };
}

//функция открытия попапа и слушатели при нажатии мышкой и esc
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closePopupByClick);
  document.addEventListener('keydown', escButtonDown);
}

//функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escButtonDown);
}


//1. Функция открытия попапа Редактирования профиля.
function openProfilePopup() {
  profileFormNameInput.value = userName.textContent;
  profileFormProfInput.value = userProfession.textContent;
  openPopup(popupProfile);
  popupValidCheck(popupProfile);
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
  popupValidCheck(popupAddCard);

}

//2.1 Функция закрытия попапа для добавления карточек.
function closeAddCardPopup() {
  closePopup(popupAddCard);
}

//функция удаления карточки
function deleteCard(evt) {
  evt.target.parentNode.remove();
};

//функция лайка
function likeAction(evt){
  evt.target.classList.toggle('element__like-button_active');
};

//закрыть попап с фото
function closePopupImage() {
  closePopup(popupImage);
 };

//открытие попапа с фото
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
//overLayProfile.addEventListener('click', closePopupByClick);
//overLayCards.addEventListener('click', closePopupByClick);
//overLayImage.addEventListener('click', closePopupByClick);
