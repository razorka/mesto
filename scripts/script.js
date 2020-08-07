const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupSaveButton = popup.querySelector('.popup__save-button');
const finalname = document.querySelector('.profile__name');
const finalprof = document.querySelector('.profile__profession');
const nameInput = document.querySelector('.popup__field-name');
const profInput = document.querySelector('.popup__profession');


/*const popupToggle = function() {
  popup.classList.toggle('popup_opened');
}

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);*/

const popupOpen = function() {
  nameInput.value = finalname.textContent;
  profInput.value = finalprof.textContent;
  popup.classList.add('popup_opened');
}


const popupClose = function() {
  popup.classList.remove('popup_opened');
}

popupOpenButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);



function editProfile(evt) {
  evt.preventDefault();
  finalname.textContent = nameInput.value;
  finalprof.textContent = profInput.value;
  popupClose();
}

popupSaveButton.addEventListener('click', editProfile);

