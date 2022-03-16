import { FormValidator } from '../components/FormValidator.js'
import { Card } from '../components/Card.js'
import './index.css'
import { initialCards, enableValidation } from '../utils/constants.js'
import { api } from '../components/Api.js'


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
import { data } from 'autoprefixer'


api.getProfile()
    .then(res => {
        user.setUserInfo(res.name, res.about)
    })

api.getInitialCards()
    .then(cardsList => {
        cardsList.forEach(data => {
            const cardElement = getCard(data)

            cardList.addInitialItem(cardElement);
        });
    })


const cardList = new Section({
    items: initialCards
    , renderer: (data) => {
        const cardElement = getCard(data)
        cardList.addInitialItem(cardElement);
    },
}, cardListSelector);

cardList.render();

function getCard(item) {
    // тут создаете карточку и возвращаете ее 132331
    const card = new Card(item, cardTemplateSelector, handleCardClick);
    const cardElement = card.getCardElement();
    return cardElement
}

//function createCard(data) {
//   const cardElement = getCard(data)
//   cardList.addInitialItem(cardElement);
//}

//function createCard(data) {
//   const card = new Card(data, cardTemplateSelector, handleCardClick);
//   const cardElement = card.getCardElement();
//   cardList.addInitialItem(cardElement);
//}



const popupTypeimage = new PopupWithImage('.popup_type_image-container');
popupTypeimage.setEventListeners();


const user = new UserInfo({ userNameElement: profileTitle, userInfoElement: profileSubtitle });

const popupTypeEdit = new PopupWithForm({
    popupSelector: '.popup_type_edit',
    handleFormSubmit: (data) => {
        const { name, job } = data
        api.editProfile(name, name)
            .then(res => {
                user.setUserInfo(name, job);
            })
        popupTypeEdit.close();
    }
});

popupTypeEdit.setEventListeners();

const popupTypeAdd = new PopupWithForm({
    popupSelector: '.popup_type_add-card',
    handleFormSubmit: (data) => {
        createCard(data);
        popupTypeAdd.close();
    }
});

popupTypeAdd.setEventListeners();

placeAddButton.addEventListener('click', () => {
    addCardFormValidation.resetValidation();
    popupTypeAdd.open();
});

profileEditButton.addEventListener('click', () => {
    editFofmValidation.resetValidation();

    const userData = user.getUserInfo();

    nameInput.value = userData.name;
    jobInput.value = userData.job;
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




