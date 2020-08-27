const popupProfile = document.querySelector('.popup_profile');
const popupAddCard = document.querySelector('.popup_card');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupCardsOpenButton = document.querySelector('.profile__submit-button');
const popupProfileCloseButton = document.querySelector('.popup__close-button_profile');
const popupSaveProfileButton = document.querySelector('.popup__save-button_profile');
const popupCardsCloseButton = document.querySelector('.popup__close-button_card');
const popupSaveCardsButton = document.querySelector('.popup__save-button_card');
const userName = document.querySelector('.profile__name');
const userProfession = document.querySelector('.profile__profession');
const nameInput = document.querySelector('.popup__field_name');
const profInput = document.querySelector('.popup__field_profession');
const placeNameInput = document.querySelector('.popup__field_place-name');
const placeLinkInput = document.querySelector('.popup__field_place-link');
const elementList = document.querySelector('.elements__list');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//1. Переменная с Функцией открытия попапа Редактирования профиля.
function openProfilePopup() {
  nameInput.value = userName.textContent;
  profInput.value = userProfession.textContent;
  openPopup(popupProfile);
}

//1.1 Переменная с Функцией закрытия попапа Редактирования профиля.
function closeProfilePopup() {
  closePopup(popupProfile);
}

//1.2 Функция редактирования и сохранения данных профиля.
function editProfile(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userProfession.textContent = profInput.value;
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

//Функция создания карточки - в функцию мы в качестве параметров передаем переменные ссылки и имени из массива
function createCard(link, name) {
  const card = document.querySelector('.card').content.cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  cardImage.src = link;
  cardImage.alt = 'Фото' + name;
  card.querySelector('.element__name').textContent = name;

  const deleteCardButton = card.querySelector('.element__delete-button');
  deleteCardButton.addEventListener('click', function(evt) {
    evt.target.parentNode.remove();
  });

  const likeButton = card.querySelector('.element__like-button');
  likeButton.addEventListener('click', function(){
    likeButton.classList.toggle('element__like-button_active');
  });

  cardImage.addEventListener('click', openFullImage);

  const popupImage = document.querySelector('.popup_image');
  const popupFullImage = popupImage.querySelector('.element__image-screen');
  const popupImageName = popupImage.querySelector('.element__image-name');
   function openFullImage(){
    openPopup(popupImage);
    popupFullImage.src = link;
    popupImageName.alt = 'Фото' + name;
    popupImageName.textContent = name;
  };

  const popupImageClose = document.querySelector('.popup__close-button_image');
  popupImageClose.addEventListener('click', function(){
   closePopup(popupImage);
  });

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
popupSaveProfileButton.addEventListener('click', editProfile);
popupCardsOpenButton.addEventListener('click', openAddCardPopup);
popupCardsCloseButton.addEventListener('click', closeAddCardPopup);
popupSaveCardsButton.addEventListener('click', saveCard);

