const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const placeAddButton = profile.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupContainer = popup.querySelector('.popup__container');
const popupCloseButton = popupEditProfile.querySelector('.popup__close');
const addPopupCloseButton = popupAddCard.querySelector('.popup__close');
const modalCardView = document.querySelector('.popup_type_image-container');
const cardViewCloseBtn = modalCardView.querySelector('.popup__close');
const formEditProfile = popupEditProfile.querySelector('.popup-form');
const addPopupImageName = document.querySelector('.popup__place-name');
const addPopupImagelink = modalCardView.querySelector('.popup__image-link');
const formAddCard = popupAddCard.querySelector('.popup-form');
const inputName = document.querySelector(".popup-form__input_card-name");
const inputLink = document.querySelector(".popup-form__input_card-link");
const nameInput = document.querySelector('.popup-form__input_name');
const jobInput = document.querySelector('.popup-form__input_job');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');

formEditProfile.addEventListener('submit', (event) => {
    event.preventDefault()
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    toogleModal(popupEditProfile);
});

formAddCard.addEventListener('submit', (event) => {
    event.preventDefault()

    const nameValue = inputName.value;
    const linkValue = inputLink.value;
    document.placeForm.reset();
    renderCard({
        name: nameValue,
        link: linkValue
    })

    toogleModal(popupAddCard);
});

function toogleModal(modal) {

    modal.classList.toggle('popup_opened')

}
profileEditButton.addEventListener('click', () => toogleModal(popupEditProfile))
popupCloseButton.addEventListener('click', () => toogleModal(popupEditProfile))

placeAddButton.addEventListener('click', () => toogleModal(popupAddCard))
addPopupCloseButton.addEventListener('click', () => toogleModal(popupAddCard))

cardViewCloseBtn.addEventListener('click', (event) => toogleModal(modalCardView))

const cardsList = document.querySelector(".gallery");
const cardTemplate = document.querySelector('.card-template').content;

function createCard(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.gallery__item');
    const cardTitle = cardElement.querySelector('.gallery__title');
    const deleteButton = cardElement.querySelector('.gallery__delete-button');
    const likeButton = cardElement.querySelector('.gallery__button')
    const viewCardButton = cardElement.querySelector('.gallery__view-button');
    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;

    function openPopupImage(modalCardView) {
        addPopupImageName.textContent = cardTitle.textContent;
        addPopupImagelink.src = cardImage.src;
        toogleModal(modalCardView);
    }

    function likeClickHandler() {
        likeButton.classList.toggle('gallery__button_active');
    }
    //удаление карточек
    function deleteHandler(e) {
        e.target.closest('.gallery__cart').remove()
    }

    deleteButton.addEventListener("click", deleteHandler)
    likeButton.addEventListener("click", likeClickHandler)
    viewCardButton.addEventListener('click', () => openPopupImage(modalCardView))

    cardsList.prepend(cardElement);
    return cardElement;
}

function renderCard(cardData) {
    const cardElement = createCard(cardData);
    cardsList.prepend(cardElement);
}

initialCards.forEach(renderCard);

