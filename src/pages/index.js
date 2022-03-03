import { FormValidator } from '../components/FormValidator.js'
import { Card } from '../components/card.js'

import { initialCards, enableValidation } from '../utils/constants.js'

import { addPopupImageName, addPopupImagelink } from '../utils/constants.js'

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
    cardsList,
    cardTemplateSelector,
    cardListSelector
} from '../utils/constants.js'

import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        createCard(item);
    },
}, cardListSelector);

cardList.render();

function createCard(data) {

    const card = new Card(data, cardTemplateSelector, handleCardClick);
    const cardElement = card.getCardElement();
    cardList.addInitialItem(cardElement);
}

const popupTypeimage = new PopupWithImage('.popup_type_image-container');
popupTypeimage.setEventListeners();


const user = new UserInfo({ userNameElement: profileTitle, userInfoElement: profileSubtitle });

const popupTypeEdit = new PopupWithForm({
    popupSelector: '.popup_type_edit',
    handleFormSubmit: (data) => {
        user.setUserInfo(data);
        popupTypeEdit.close();
    }
});

popupTypeEdit.setEventListeners();

const popupTypeAdd = new PopupWithForm({
    popupSelector: '.popup_type_add-card',
    handleFormSubmit: (data) => {
        createCard(data, cardList,);
        popupTypeAdd.close();
    }
});

popupTypeAdd.setEventListeners();

placeAddButton.addEventListener('click', () => {
    popupTypeAdd.open();
});

profileEditButton.addEventListener('click', () => {
    // addCardFormValidation(formAddCard);
    popupTypeEdit.open();
});

const editFofmValidation = new FormValidator(enableValidation, formEditProfile);
const addCardFormValidation = new FormValidator(enableValidation, formAddCard);


editFofmValidation.enableValidation()
addCardFormValidation.enableValidation()

function handleCardClick(name, link) {
    popupTypeimage.open(name, link);
}






/*function renderCard() {
    return {
        name: inputName.value,
        link: inputLink.value
    };
}*/

/*function createCard(data, cardList) {
const card = new Card(data, cardTemplateSelector, handleCardClick);
const cardElement = card.getCardElement();

cardList.addInitialItem(cardElement);
}*/

//initialCards.forEach((data) => {
  //  cardsList.prepend(createCard(data))
//});




