const popupProfile = document.querySelector('#profile-popup');
const popupCards = document.querySelector('#card-popup');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupCardsOpenButton = document.querySelector('.profile__submit-button');
const popupProfileCloseButton = document.querySelector('#profile-close-button');
const popupSaveProfileButton = document.querySelector('#profile-save-button');
const popupCardsCloseButton = document.querySelector('#cards-close-button');
const popupSaveCardsButton = document.querySelector('#cards-save-button');
//const deleteCardButton = document.querySelector('.element__delete-button')
//const likeButton = document.querySelector('.element__like-button');
const finalname = document.querySelector('.profile__name');
const finalprof = document.querySelector('.profile__profession');
const nameInput = document.querySelector('.popup__field_name');
const profInput = document.querySelector('.popup__field_profession');
const placeName = document.querySelector('.popup__field_place-name');
const placeLink = document.querySelector('.popup__field_place-link');

//1. Переменная с Функцией открытия попапа Редактирования профиля.
const popupProfileOpen = function() {
  nameInput.value = finalname.textContent;      //Значение поля ввода = имеющийся сохраненный текст на странице.
  profInput.value = finalprof.textContent;      //Значение поля ввода = имеющийся сохраненный текст на странице.
  popupProfile.classList.add('popup_opened');   // Добавляем класс со свойством block - попап открывается.
  console.log('Открыл? - значит работаю!')
}

//1.1 Переменная с Функцией закрытия попапа Редактирования профиля.
const popupProfileClose = function() {
  popupProfile.classList.remove('popup_opened'); // Удаляем класс со свойством block - попап закрывается.
  console.log('Закрыл? - значит работаю!')
}

popupProfileOpenButton.addEventListener('click', popupProfileOpen); //добавляем событие "клик" для открытия попапа
popupProfileCloseButton.addEventListener('click', popupProfileClose); //добавляем событие "клик" для закрытия попапа


//1.2 Функция редактирования и сохранения данных профиля.
function editProfile(evt) {
  evt.preventDefault();                     //Останавливаем всплывающее действие - чтобы оно завершилось только в рамках этой функции и не двигалось дальше по коду.
  finalname.textContent = nameInput.value;  //Сохраняем данные из поля ввода в поля данных на странице
  finalprof.textContent = profInput.value;  //Сохраняем данные из поля ввода в поля данных на странице
  popupProfileClose();                      //закрываем попап
  console.log('Сохранил? Значит работаю!')
}

popupSaveProfileButton.addEventListener('click', editProfile); //добавляем событие "клик" для сохранения и закрытия попапа

//2 Функция открытия попапа для добавления карточек.
const popupCardsOpen = function() {
  placeName.value = placeName.textContent;  //Значение поля ввода = имеющийся сохраненный текст на странице.
  placeLink.value = placeLink.textContent;  //Значение поля ввода = имеющийся сохраненный текст на странице.
  popupCards.classList.add('popup_opened'); // Добавляем класс со свойством block - попап открывается.
  console.log('Открыл? - значит работаю!')
}

//2.1 Функция закрытия попапа для добавления карточек.
const popupCardsClose = function() {
  popupCards.classList.remove('popup_opened');  // Удаляем класс со свойством block - попап закрывается.
  console.log('Закрыл? - значит работаю!')
}

popupCardsOpenButton.addEventListener('click', popupCardsOpen);   //добавляем событие "клик" для открытия попапа
popupCardsCloseButton.addEventListener('click', popupCardsClose); //добавляем событие "клик" для закрытия попапа

//3. Выбрал блок добавления элементов
const elementList = document.querySelector('.elements__list');

//4. Определяем массив с карточками.
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

//Функция создания карточки - в функцию мы в качестве параметров передаем переменные ссылки и имени из массива
function CardTemplate(link, name) { // создаем функцию с параметрами - ссылка и имя - а в функциях выше получается мы определяем эти параметры - cardName и cardLink
  const elementCardTemplate = document.querySelector('#element').content.cloneNode(true); // назначаем переменную - выбирамес template, открываем содержимое, клонируем для добавления

  elementCardTemplate.querySelector('.element__image').src = link; // присваиваем первое свойство - ссылку - а потом мы этому свойству передаем уже cardLink
  elementCardTemplate.querySelector('.element__image').alt = 'Фото' + name; // альтернативный текст
  elementCardTemplate.querySelector('.element__name').textContent = name; // присваиваем второе свойство - имя - а потом мы этому свойству передаем уже cardName

  const deleteCardButton = elementCardTemplate.querySelector('.element__delete-button');  // именно тут, потому что элемент создается здесь и ищем в элементе template, а не в HTML определяем кнопку удаления карточки
  deleteCardButton.addEventListener('click', function(evt) {                      // делаем обработчик события на удаление карточки по клику
    evt.target.parentNode.remove();                                               //удаляем родительский элемент
  });

  const likeButton = elementCardTemplate.querySelector('.element__like-button');
  likeButton.addEventListener('click', function(){
    likeButton.classList.toggle('element__like-button_active');
    console.log('Лайкнул? - значит работаю!')
  });

  const popupImage = document.querySelector('#screen-image');
  const popupImageOpen = elementCardTemplate.querySelector('.element__image');
  const popupFullImage = popupImage.querySelector('.element__image-screen');
  const popupImageName = popupImage.querySelector('.element__image-name');
  popupImageOpen.addEventListener('click', function(){
    popupImage.classList.add('popup_opened');
    popupFullImage.src = link;
    popupImageName.textContent = name;
  });

  const popupImageClose = document.querySelector('#screen-close-button');
  popupImageClose.addEventListener('click', function(){
    popupImage.classList.remove('popup_opened');
  });


  //const imageItem = document.querySelector('.element__image-screen');
  //imageItem.src = elementCardTemplate.querySelector('.element__image').src;



  return elementCardTemplate; // возвращаем(выдаем) элемент - template с параметрами link и name
  }


  //5. Создадим функцию стартового добавления карточек в блок.

function addCardsStart() {
  const templates = initialCards.map(function newCard(element) {    //Определяем переменную, которая выполняет перебор массива с созданием нового массива из данных элементов первоначального массива
    const cardLink = element.link;                                  //Назначаем переменную с данными по ссылке из массива
    const cardName = element.name;                                  //Назначаем переменную с данными по имени из массива
    return CardTemplate(cardLink, cardName);                        //Возвращаем (формируем, отображаем) с помощью функции, которая формирует карточку, элемент из массива с данными из переменных.
  })

  for (let i = 0; i < initialCards.length; i=i+1) {                //создаем цикл, который будет последовательно добавлять элементы template друг за другом с шагом 1
    elementList.append(templates[i]);
}

}
addCardsStart();      //Запускаем функцию и добавляем карточки на страницу - только те, получается, что в первоначальном массиве есть.



  function AddAndSaveCard(evt) {
    evt.preventDefault(); // останавливаем всплывающее событие - чтобы дальше функции ничего не пошло - как я это понял
    const newElement = {    //создаем переменную-элемент с новыми свойствами name и link - в них сохраняются введенные пользователем данные
      name:(placeName.value),
      link:(placeLink.value)
      }
    initialCards.unshift(newElement); // добавляем новый элемент в массив в начало
    const newTemplate = CardTemplate(newElement.link, newElement.name); // создаем переменную - новую карточку с данными из переменной newElement
    elementList.prepend(newTemplate);   //добавляем новую карточку в блок с карточками в начало.
    popupCardsClose();    //закрываем попап
  }
  popupSaveCardsButton.addEventListener('click', AddAndSaveCard);   //добавляем событие "клик" для сохранения и закрытия попапа
