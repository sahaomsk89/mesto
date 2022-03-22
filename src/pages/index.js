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
    avatarInput
} from '../utils/constants.js'

import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import { data } from 'autoprefixer'

let userId

api.getProfile()

    .then(res => {
        //console.log(res)
        user.setUserInfo(res.name, res.about)
        userId = res._id;

    })

api.getInitialCards()
    .then(cardsList => {
        // console.log('cardsList', cardsList)
        cardsList.forEach(data => {
            const cardElement = getCard(data, userId)
            // console.log('cardsList', userId)
            cardList.addInitialItem(cardElement);
        });

    })


const cardList = new Section({
    items: [], renderer: (data) => {
        const cardElement = getCard(data, userId)
        cardList.addInitialItem(cardElement);
    },
}, cardListSelector);

cardList.render();

function getCard(item, userId) {
    // тут создаете карточку и возвращаете 
    const card = new Card(
        item, cardTemplateSelector, handleCardClick, {
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

//function createCard(data) {
//   const card = new Card(data, cardTemplateSelector, handleCardClick);
//   const cardElement = card.getCardElement();
//   cardList.addInitialItem(cardElement);
//}


const popupTypeimage = new PopupWithImage('.popup_type_image-container');
popupTypeimage.setEventListeners();


const user = new UserInfo({ userNameElement: profileTitle, userInfoElement: profileSubtitle, userAvatarElement: avatarImg });

const popupTypeEdit = new PopupWithForm({
    popupSelector: '.popup_type_edit',
    handleFormSubmit: (data) => {
        popupTypeAvatar.renderLoading(true);
        const { name, job } = data
        api.editProfile(name, job)
            .then(res => {
                user.setUserInfo(name, job);
            })
            .catch((err) => {
                console.log(`${err}`)
            })
        popupTypeEdit.close();
    }
});

popupTypeEdit.setEventListeners();

const popupTypeAdd = new PopupWithForm({
    popupSelector: '.popup_type_add-card',

    handleFormSubmit: (data) => {
        popupTypeAvatar.renderLoading(true);
        api.addCard(data.name, data.link, data.likes, data._id, data.userId, data.ownerId)
            .then(res => {
                console.log(res)
                const cardElement = getCard({
                    name: res.name,
                    link: res.link,
                    likes: res.likes,
                    id: res._id,
                    userId: res.userId,
                    ownerId: res.owner._id
                })
                    .catch((err) => {
                        console.log(`${err}`)
                    })
            })
        popupTypeAdd.close();

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
            })
            .catch((err) => {
                console.log(`${err}`)
            })
        popupTypeAvatar.close();
    }
});

popupTypeAvatar.setEventListeners();


avatarImg.addEventListener('click', () => {
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

const confirmPopup = new PopupWithForm({ popupSelector: '.popup_type_delete-confirm' });

editFofmValidation.enableValidation()
addCardFormValidation.enableValidation()
avatarValidation.enableValidation()

confirmPopup.setEventListeners();


function handleDeliteClick(card) {
    //console.log(card)
    confirmPopup.open();
    confirmPopup.changeSubmitHandler(
        () => {
            api.deleteCard(card._id)
                .then(res => {
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

    } else {
        api.likeCard(card._id)
            .then(res => {
                //console.log(res)
                card.setLikes(res.likes);
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




