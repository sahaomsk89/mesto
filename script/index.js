const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const placeAddButton = profile.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupCloseButton = popupEditProfile.querySelector('.popup__close');
const addPopupCloseButton = popupAddCard.querySelector('.popup__close');
const modalCardView = document.querySelector('.popup_type_image-container');
const cardViewCloseBtn = modalCardView.querySelector('.popup__close');
const formEditProfile = popupEditProfile.querySelector('.popup-form');
const addPopupImageName = document.querySelector('.popup__place-name');
const addPopupImagelink = modalCardView.querySelector('.popup__image-link');
const formAddCard = popupAddCard.querySelector('.popup-form');
const addSubmitButton = formAddCard.querySelector('.popup-form__button');
const inputName = document.querySelector(".popup-form__input_card-name");
const inputLink = document.querySelector(".popup-form__input_card-link");
const addInputArray = [inputName, inputLink];
const nameInput = document.querySelector('.popup-form__input_name');
const jobInput = document.querySelector('.popup-form__input_job');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');

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
    setSubmitBtnState(addInputArray, addSubmitButton, 'popup-form__button_disabled');
    closeModal(popupAddCard);

});

function openModal(modal) {
    modal.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEscKey);
}

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


    function openPopupImage() {
        addPopupImageName.textContent = cardTitle.textContent;
        addPopupImagelink.src = cardImage.src;
        openModal(modalCardView);
    }

    function likeClickHandler() {
        likeButton.classList.toggle('gallery__button_active');
    }

    function deleteHandler(e) {
        e.target.closest('.gallery__cart').remove()
    }

    deleteButton.addEventListener("click", deleteHandler)
    likeButton.addEventListener("click", likeClickHandler)
    viewCardButton.addEventListener('click', () => openPopupImage(modalCardView))
    return cardElement;
}

function renderCard(cardData) {
    const cardElement = createCard(cardData);
    cardsList.prepend(cardElement);
}

initialCards.forEach(renderCard);


function closePopupByOverlay(event) {
    if (event.currentTarget === event.target) {
        closeModal(event.currentTarget);
    }
}

function closePopupByEscKey(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closeModal(openedPopup);
    }
}