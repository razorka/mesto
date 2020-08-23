const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupSaveButton = document.querySelector('.popup__save-button');
const finalname = document.querySelector('.profile__name');
const finalprof = document.querySelector('.profile__profession');
const nameInput = document.querySelector('.popup__field_name');
const profInput = document.querySelector('.popup__field_profession');

/*const popupToggle = function() {
  popup.classList.toggle('popup_opened');
}

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);*/

const popupOpen = function() {
  nameInput.value = finalname.textContent;
  profInput.value = finalprof.textContent;
  popup.classList.add('popup_opened');
  console.log('Открыл? - значит работаю!')
}


const popupClose = function() {
  popup.classList.remove('popup_opened');
  console.log('Закрыл? - значит работаю!')
}

popupOpenButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);



function editProfile(evt) {
  evt.preventDefault();
  finalname.textContent = nameInput.value;
  finalprof.textContent = profInput.value;
  popupClose();
  console.log('Сохранил? Значит работаю!')
}

popupSaveButton.addEventListener('click', editProfile);


//1. Выбрал блок добавления элементов
const elementList = document.querySelector('.elements__list');

//2. Определяем массив с карточками.
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//3. Создадим функцию стартового добавления карточек в блок.

function addCardsStart() {
  //Определяем каждый элемент со свойствами в имеющемся массиве,
  //и с помощью новой функции добавляем последовательно в конец секции
  // с карточками новые элементы со свойствами из массива.
  initialCards.forEach(function (element) {
    // Определяем свойства
    const cardLink = element.link;
    const cardName = element.name;
    //функция присваивания свойств карточке
    function CardInfo(link, name) {
      const elementCardTemplate = document.querySelector('#element').content.cloneNode(true);
      console.log(elementCardTemplate);

      elementCardTemplate.querySelector('.element__image').src = link;
      elementCardTemplate.querySelector('.element__image').alt = 'Фото' + name;
      elementCardTemplate.querySelector('.element__name').textContent = name;

      return elementCardTemplate;
      }
    // Добавляем карточки в секцию
    elementList.append(CardInfo(cardLink, cardName));
  })
}
addCardsStart();
