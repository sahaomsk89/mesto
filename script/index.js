import { FormValidator } from './FormValidator.js'
import { Card } from './card.js'

import { initialCards, enableValidation } from './constants.js'
import { openModal } from './utils.js'
import { modalCardView, addPopupImageName, addPopupImagelink } from './constants.js'

import {
    profile,
    popups,
    profileEditButton,
    placeAddButton,
    popupEditProfile,
    formEditProfile,
    popupCloseButton,
    addPopupCloseButton,
    cardViewCloseBtn,
    popupAddCard,
    formAddCard,
    addSubmitButton,
    inputName,
    inputLink,
    addInputArray,
    nameInput,
    jobInput,
    profileTitle,
    profileSubtitle,
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
    disableButton(formAddCard);
    closeModal(popupAddCard);
});

function closeModal(modal) {
    modal.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEscKey);
}

function disableButton(form) {
    const button = form.querySelector(".popup-form__button");
    button.classList.add("popup-form__button_disabled")
    button.setAttribute("disabled", '')
}


const handleCardClick = (name, link) => {
    addPopupImageName.textContent = name
    addPopupImagelink.src = link
    addPopupImagelink.alt = name
    openModal(modalCardView);
}


popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closeModal(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
            closeModal(popup)
        }
    })
})

profileEditButton.addEventListener('click', () => openModal(popupEditProfile))
//popupCloseButton.addEventListener('click', () => closeModal(popupEditProfile))

placeAddButton.addEventListener('click', () => openModal(popupAddCard))
//addPopupCloseButton.addEventListener('click', () => closeModal(popupAddCard))

//cardViewCloseBtn.addEventListener('click', (event) => closeModal(modalCardView))

//popupAddCard.addEventListener('click', closePopupByOverlay);
//popupEditProfile.addEventListener('click', closePopupByOverlay);
//modalCardView.addEventListener('click', closePopupByOverlay);

const cardsList = document.querySelector(".gallery");
const cardTemplateSelector = '.card-template'
const cardTemplate = document.querySelector('.card-template').content;

const renderCard = (data) => {
    const card = new Card(data, cardTemplateSelector)
    const cardElement = card.getCardElement()
    cardsList.prepend(cardElement);
};

initialCards.forEach(renderCard);


//function closePopupByOverlay(event) {
//  if (event.currentTarget === event.target) {
//    closeModal(event.currentTarget);
//}
//}

export const closePopupByEscKey = (event) => {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closeModal(openedPopup);
    }
}