const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const placeAddButton = profile.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const editPopup = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupContainer = popup.querySelector('.popup__container');
const popupCloseButton = editPopup.querySelector('.popup__close');
const addPopupCloseButton = popupAddCard.querySelector('.popup__close');
const viewCardModal = document.querySelector('.popup_type_image-container');
const popupContainerImg = viewCardModal.querySelector('.popup__container-image');
const closeViewCardModal = viewCardModal.querySelector('.popup__close');
const editForm = editPopup.querySelector('.popup-form');
const AddCardForm = popupAddCard.querySelector('.popup-form');
const inputName = document.querySelector(".popup-form__input_card-name");
const inputLink = document.querySelector(".popup-form__input_card-link");
let nameInput = document.querySelector('.popup-form__input_name');
let jobInput = document.querySelector('.popup-form__input_job');
let profileTitle = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');

editForm.addEventListener('submit', (event) => {
    event.preventDefault()
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    toogleModal(editPopup);
});

AddCardForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const nameValue = inputName.value;
    const linkValue = inputLink.value;

    createCard({
        name: nameValue,
        link: linkValue
    })
    toogleModal(popupAddCard);
});

function toogleModal(modal) {

    modal.classList.toggle('popup_opened')

}
profileEditButton.addEventListener('click', () => toogleModal(editPopup))
popupCloseButton.addEventListener('click', () => toogleModal(editPopup))

placeAddButton.addEventListener('click', () => toogleModal(popupAddCard))
addPopupCloseButton.addEventListener('click', () => toogleModal(popupAddCard))

closeViewCardModal.addEventListener('click', (event) => toogleModal(viewCardModal))

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

const list = document.querySelector(".gallery");
const cardTemplate = document.querySelector('.card-template').content;

//удаление карточек
function deleteHandler(e) {
    e.target.closest('.gallery__carts').remove()
    cardElement.remove()
}

function createCard(cardData) {
    console.log("cardData", cardData);
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.gallery__item');
    const cardTitle = cardElement.querySelector('.gallery__title');
    const deleteButton = cardElement.querySelector('.gallery__delete-button');
    const likeButton = cardElement.querySelector('.gallery__button')
    const viewCardButton = cardElement.querySelector('.gallery__view-button');
    cardTitle.textContent = cardData.name;
    cardImage.src = `${cardData.link}`;

    function openPopupImage(viewCardModal) {
        document.querySelector('.popup__place-name').textContent = cardTitle.textContent;
        document.querySelector('.popup__image-link').src = cardImage.src;
        toogleModal(viewCardModal);
    }

    deleteButton.addEventListener("click", deleteHandler)
    likeButton.addEventListener("click", likeClickHandler)
    viewCardButton.addEventListener('click', () => openPopupImage(viewCardModal))

    function likeClickHandler() {
        likeButton.classList.toggle('gallery__button_active');
    }

    list.prepend(cardElement);
}

initialCards.forEach(createCard);

