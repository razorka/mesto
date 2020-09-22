const popupImage = document.querySelector(".popup_image");
const popupImageScreen = popupImage.querySelector(".element__image-screen");
const popupImageName = popupImage.querySelector(".element__image-name");
const popupImageCloseButton = document.querySelector(".popup__close-button_image");

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
  popup.addEventListener("mousedown", closePopupByClick);
  document.addEventListener("keydown", escButtonDown);
}

//функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("mousedown", closePopupByClick);
  document.removeEventListener("keydown", escButtonDown);
}

export {closePopupByClick, escButtonDown, openPopup, closePopup, escButton, popupImage, popupImageScreen, popupImageName, popupImageCloseButton};

