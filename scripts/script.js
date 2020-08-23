let popupProfile = document.querySelector('#profile-popup');
let popupCards = document.querySelector('#card-popup');
let popupProfileOpenButton = document.querySelector('.profile__edit-button');
let popupCardsOpenButton = document.querySelector('.profile__submit-button');
let popupProfileCloseButton = document.querySelector('#profile-close-button');
let popupSaveProfileButton = document.querySelector('#profile-save-button');
let popupCardsCloseButton = document.querySelector('#cards-close-button');
let popupSaveCardsButton = document.querySelector('#cards-save-button');
const finalname = document.querySelector('.profile__name');
const finalprof = document.querySelector('.profile__profession');
const nameInput = document.querySelector('.popup__field_name');
const profInput = document.querySelector('.popup__field_profession');
const placeName = document.querySelector('.popup__field_place-name');
const placeLink = document.querySelector('.popup__field_place-link');

//Функция открытия попапа Редактирования профиля.
const popupProfileOpen = function() {
  nameInput.value = finalname.textContent;
  profInput.value = finalprof.textContent;
  popupProfile.classList.add('popup_opened');
  console.log('Открыл? - значит работаю!')
}


const popupProfileClose = function() {
  popupProfile.classList.remove('popup_opened');
  console.log('Закрыл? - значит работаю!')
}

popupProfileOpenButton.addEventListener('click', popupProfileOpen);
popupProfileCloseButton.addEventListener('click', popupProfileClose);



function editProfile(evt) {
  evt.preventDefault();
  finalname.textContent = nameInput.value;
  finalprof.textContent = profInput.value;
  popupProfileClose();
  console.log('Сохранил? Значит работаю!')
}

popupSaveProfileButton.addEventListener('click', editProfile);

const popupCardsOpen = function() {
  placeName.value = placeName.textContent;
  placeLink.value = placeLink.textContent;
  popupCards.classList.add('popup_opened');
  console.log('Открыл? - значит работаю!')
}

const popupCardsClose = function() {
  popupCards.classList.remove('popup_opened');
  console.log('Закрыл? - значит работаю!')
}

popupCardsOpenButton.addEventListener('click', popupCardsOpen);
popupCardsCloseButton.addEventListener('click', popupCardsClose);


function AddAndSaveCard(evt) {
  evt.preventDefault();
  const newElement = {
    name:(placeName.value),
    link:(placeLink.value)
    }
  initialCards.unshift(newElement);
  const newTemplate = CardTemplate(newElement.link, newElement.name);
  elementList.prepend(newTemplate);
  popupCardsClose();
}
popupSaveCardsButton.addEventListener('click', AddAndSaveCard);




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

  const templates = initialCards.map(function newCard(element) {
     // Определяем свойства

     const cardLink = element.link;
     const cardName = element.name;
    return CardTemplate(cardLink, cardName);
  })
 for(const index in templates) {
   elementList.append(templates[index])
 }
}
addCardsStart();



//функция присваивания свойств карточке
function CardTemplate(link, name) {
  const elementCardTemplate = document.querySelector('#element').content.cloneNode(true);
  console.log(elementCardTemplate);

  elementCardTemplate.querySelector('.element__image').src = link;
  elementCardTemplate.querySelector('.element__image').alt = 'Фото' + name;
  elementCardTemplate.querySelector('.element__name').textContent = name;

  return elementCardTemplate;
  }





  /*function addCardsStart() {
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
  addCardsStart();*/

