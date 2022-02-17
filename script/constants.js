export const initialCards = [
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

export const enableValidation = {
    formSelector: '.popup-form',
    inputSelector: '.popup-form__input',
    submitButtonSelector: '.popup-form__button',
    inactiveButtonClass: 'popup-form__button_disabled',
    inputErrorClass: 'popup-form__input_type_error',
    errorClass: 'popup-form__error_visible'
};

export const modalCardView = document.querySelector('.popup_type_image-container');
export const addPopupImageName = document.querySelector('.popup__place-name');
export const addPopupImagelink = modalCardView.querySelector('.popup__image-link');


const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const placeAddButton = profile.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupCloseButton = popupEditProfile.querySelector('.popup__close');
const addPopupCloseButton = popupAddCard.querySelector('.popup__close');

const cardViewCloseBtn = modalCardView.querySelector('.popup__close');
const formEditProfile = popupEditProfile.querySelector('.popup-form');

const formAddCard = popupAddCard.querySelector('.popup-form');
const addSubmitButton = formAddCard.querySelector('.popup-form__button');
const inputName = document.querySelector(".popup-form__input_card-name");
const inputLink = document.querySelector(".popup-form__input_card-link");
const addInputArray = [inputName, inputLink];
const nameInput = document.querySelector('.popup-form__input_name');
const jobInput = document.querySelector('.popup-form__input_job');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');

export {
    profile,
    profileEditButton,
    placeAddButton,
    popup,
    popupEditProfile,
    formEditProfile,
    popupCloseButton,
    addPopupCloseButton,
    cardViewCloseBtn,
    popupAddCard,
    formAddCard,
    addSubmitButton,
    addInputArray,
    nameInput,
    jobInput,
    profileTitle,
    profileSubtitle,
}