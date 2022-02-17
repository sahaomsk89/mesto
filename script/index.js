import { FormValidator } from './FormValidator.js'
import { Card } from './cards.js'

import { initialCards, enableValidation } from './constants.js'
import { openModal } from './utils.js'
import { modalCardView, addPopupImageName, addPopupImagelink } from './constants.js'

import {
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
    profileSubtitle
} from './constants.js'



const editFofmValidation = new FormValidator(enableValidation, formEditProfile);
const addCardFormValidation = new FormValidator(enableValidation, formAddCard);

editFofmValidation.enableValidation()
addCardFormValidation.enableValidation()


formEditProfile.addEventListener('submit', (event) => {
    event.preventDefault()
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closeModal(popupEditProfile);
});

formAddCard.addEventListener('submit', (event) => {
    event.preventDefault()

    const nameValue = inputName.value;
    const linkValue = inputLink.value;

    formAddCard.reset();
    renderCard({
        name: nameValue,
        link: linkValue
    })
    closeModal(popupAddCard);
});

function closeModal(modal) {
    modal.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEscKey);
}

profileEditButton.addEventListener('click', () => openModal(popupEditProfile))
popupCloseButton.addEventListener('click', () => closeModal(popupEditProfile))

placeAddButton.addEventListener('click', () => openModal(popupAddCard))
addPopupCloseButton.addEventListener('click', () => closeModal(popupAddCard))

cardViewCloseBtn.addEventListener('click', (event) => closeModal(modalCardView))

popupAddCard.addEventListener('click', closePopupByOverlay);
popupEditProfile.addEventListener('click', closePopupByOverlay);
modalCardView.addEventListener('click', closePopupByOverlay);

const cardsList = document.querySelector(".gallery");
const cardTemplateSelector = '.card-template'
const cardTemplate = document.querySelector('.card-template').content;

const renderCard = (data) => {
    const card = new Card(data, cardTemplateSelector)
    const cardElement = card.getCardElement()
    cardsList.prepend(cardElement);
};

initialCards.forEach(renderCard);

function closePopupByOverlay(event) {
    if (event.currentTarget === event.target) {
        closeModal(event.currentTarget);
    }
}

export const closePopupByEscKey = (event) => {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closeModal(openedPopup);
    }
}