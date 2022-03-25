import { FormValidator } from '../components/FormValidator.js'
import { Card } from '../components/Card.js'
import './index.css'
import { initialCards, enableValidation } from '../utils/constants.js'
import { api } from '../components/Api.js'
import "regenerator-runtime/runtime";
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
    cardListSelector,
    avatarImg,
    avatarPopup,
    avatarForm,
    avatarInput,
    avatarUpdate,
} from '../utils/constants.js'

import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';


let userId


Promise.all([api.getInitialCards(), api.getProfile()])
    //console.log(cards)
    .then(([cards, userData]) => {
        userId = userData._id;
        user.setUserInfo(userData.name, userData.about);
        user.setUserAvatar(userData.avatar);
        cards.reverse()
        cardList.renderItems(cards);
    })
    .catch((err) => { console.log(`Ошибка: ${err}`) })

const cardList = new Section({
    renderer: (data) => {
        const cardElement = getCard(data, userId)
        cardList.addInitialItem(cardElement);
    },
}, cardListSelector);

function getCard(data, userId) {
    // тут создаете карточку и возвращаете 
    const card = new Card(
        data, cardTemplateSelector, handleCardClick, {
        handlelikeClick: () => handlelikeClick(card, data),
        handleDeliteClick: () => handleDeliteClick(card),
    },
        userId,

    )

    const cardElement = card.getCardElement();
    return cardElement
}

//function createCard(data) {
//   const cardElement = getCard(data)
//   cardList.addInitialItem(cardElement);
//}

const popupTypeimage = new PopupWithImage('.popup_type_image-container');
popupTypeimage.setEventListeners();


const user = new UserInfo({ userNameSelector: profileTitle, userInfoSelector: profileSubtitle, userAvatarSelector: avatarImg });

const popupTypeEdit = new PopupWithForm({
    popupSelector: '.popup_type_edit',
    handleFormSubmit: (data) => {
        popupTypeEdit.renderLoading(true);
        const { name, job } = data
        api.editProfile(name, job)
            .then(res => {
                user.setUserInfo(name, job);
                popupTypeEdit.close();
            })
            .catch(err => console.log(`Ошибка добавление аватарки: ${err}`))
            .finally(() => popupTypeEdit.renderLoading(false));
    }
});

popupTypeEdit.setEventListeners();



const popupTypeAdd = new PopupWithForm({
    popupSelector: '.popup_type_add-card',

    handleFormSubmit: (data) => {
        popupTypeAdd.renderLoading(true);

        api.addCard(data.name, data.link)
            .then(res => {
                //console.log(res)
                const cardElement = getCard(res, userId)
                cardList.addInitialItem(cardElement)
                popupTypeAdd.close()
            })
            .catch(err => console.log(`Ошибка добавление карточки: ${err}`))
            .finally(() => popupTypeAdd.renderLoading(false));


    }

});

popupTypeAdd.setEventListeners();


const popupTypeAvatar = new PopupWithForm({
    popupSelector: '.popup_type_avatar',
    handleFormSubmit: (data) => {
        popupTypeAvatar.renderLoading(true);
        const { avatar } = data
        api.getAvatar(avatar)
            .then(res => {
                user.setUserAvatar(avatar);
                popupTypeAvatar.close()
            })
            .catch(err => console.log(`Ошибка добавление аватарки: ${err}`))
            .finally(() => popupTypeAvatar.renderLoading(false));
    }
});

popupTypeAvatar.setEventListeners();


avatarUpdate.addEventListener('click', () => {
    avatarValidation.resetValidation();
    popupTypeAvatar.open();
});

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
const avatarValidation = new FormValidator(enableValidation, avatarForm);

//const confirmPopup = new PopupWithForm({ popupSelector: '.popup_type_delete-confirm' });
const confirmPopup = new PopupWithConfirm({ popupSelector: '.popup_type_delete-confirm' });

editFofmValidation.enableValidation()
addCardFormValidation.enableValidation()
avatarValidation.enableValidation()

confirmPopup.setEventListeners();


function handleDeliteClick(card) {
    console.log(card)
    confirmPopup.open();
    confirmPopup.changeSubmitHandler(
        () => {
            api.deleteCard(card._id)
                .then(res => {
                    //console.log(res)
                    card.deleteHandler()
                    confirmPopup.close();
                })
                .catch((err) => {
                    console.log(`${err}`)
                })
        })

}

function handlelikeClick(card) {
    if (card.isLiked()) {
        api.deletelike(card._id)
            .then(res => {
                //console.log(res)
                card.setLikes(res.likes);
            })
            .catch((err) => {
                console.log(`${err}`)
            })

    } else {
        api.likeCard(card._id)
            .then(res => {
                //console.log(res)
                card.setLikes(res.likes);
            })
            .catch((err) => {
                console.log(`${err}`)
            })
    }

}


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




