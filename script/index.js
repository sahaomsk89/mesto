
const editModal = document.querySelector(".popup_type_edit");
const addCardModal = document.querySelector(".popup_type_add-card");
//const viewCardModal = document.querySelector('.popup_type_image-container');
// CloseViewCardModal = viewCardModal.querySelector('.popup__close');

const closeAddCardModalButton = addCardModal.querySelector('.popup__close');
const closeEditModal = editModal.querySelector('.popup__close');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
//const viewCardButton = document.querySelector('.card__view-button');

const inputName = document.querySelector(".popup__input_type_card-name");
const inputLink = document.querySelector(".popup__input_card-link");

const editForm = editModal.querySelector('.popup__form');
const addCardForm = addCardModal.querySelector('.popup__form');

addCardForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const nameValue = inputName.value;
  const linkValue = inputLink.value;

  createCard({
    name: nameValue,
    link: linkValue
  })
  toogleModal(addCardModal);
});

editForm.addEventListener('submit', (event) => {
  event.preventDefault()
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  toogleModal(editModal);
});


let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');



function toogleModal(modal) {

  modal.classList.toggle('popup_opened')

}
editProfileButton.addEventListener('click', () => toogleModal(editModal))
closeEditModal.addEventListener('click', () => toogleModal(editModal))

addCardButton.addEventListener('click', () => toogleModal(addCardModal))
closeAddCardModalButton.addEventListener('click', () => toogleModal(addCardModal))

//viewCardButton.addEventListener('click', () => toogleModal(viewCardModal))
//CloseViewCardModal.addEventListener('click', () => toogleModal(viewCardModal))

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
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1630354102354-2471c8851e60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
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

const list = document.querySelector(".elements");
const cardTemplate = document.querySelector('.card__template').content;

//удаление карточки
function deleteHandler(e) {
  e.target.closest('.element').remove()
  cardElement.remove()
}



function createCard(cardData) {
  console.log("cardData", cardData);
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__group-title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.element__group-heart')
  const viewCardButton = cardElement.querySelector('.element__view-button');
  cardTitle.textContent = cardData.name;
  cardImage.src = `${cardData.link}`;
  console.log("element__image", cardImage);
  console.log("element__group-title", cardTitle);


  deleteButton.addEventListener("click", deleteHandler)
  likeButton.addEventListener("click", likeClickHandler)
  viewCardButton.addEventListener('click', () => openPopupImage(viewCardModal))

  function likeClickHandler() {
    likeButton.classList.toggle('element__group-heart_active');
  }


  list.prepend(cardElement);
}

initialCards.forEach(createCard);

// function openPopupEdit() {
//   editModal.classList.add('popup_opened');
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;
// }
//
//
// function openPopupAdd() {
//   addCardModal.classList.add('popup_opened');
// }
//
// function closePopup() {
//   editModal.classList.remove('popup_opened');
// }
//
// function formSubmitHandler(evt) {
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;
//   closePopup();
// }
//
// formElement.addEventListener('submit', formSubmitHandler);
// popupOpenButton.addEventListener('click', openPopupEdit);
// popupOpenButtonAdd.addEventListener('click', openPopupAdd);
// popupCloseButton.addEventListener('click', closePopup);

//FormData.reset();
//
//очистить форму добавления карточек
//вернуть базовые значения профиля
//сделать третье модальное окно.
//Плавное открытие и закрытие попапов