const initialCards = [
  {
    name: 'Архыз',
    link: 'images/photos/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'images/photos/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'images/photos/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'images/photos/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'images/photos/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'images/photos/baikal.jpg'
  }
];

const profileName = document.querySelector('#profile-info-name');
const profileAbout = document.querySelector('#profile-info-about');
const profilePopupOpenBtn = document.querySelector('#edit-popup-btn');
const addCardPopupOpenBtn = document.querySelector('#add-popup-btn');

const profilePopup = document.querySelector('#edit-popup');
const editForm = profilePopup.querySelector('form');
const editInputName = editForm.querySelector('#input-name');
const editInputAbout = editForm.querySelector('#input-about');
const editInputArray = [editInputName, editInputAbout];
const editSubmitBtn = editForm.querySelector('.form__button');
const profilePopupCloseBtn = profilePopup.querySelector('.popup__close-btn');

const addCardPopup = document.querySelector('#add-popup');
const addForm = addCardPopup.querySelector('form');
const addInputTitle = addForm.querySelector('#input-title');
const addInputLink = addForm.querySelector('#input-link');
const addSubmitBtn = addForm.querySelector('.form__button');
const addInputArray = [addInputTitle, addInputLink];
const addCardPopupCloseBtn = addCardPopup.querySelector('.popup__close-btn');

const imagePopup = document.querySelector('#view-popup');
const imagePopupImg = imagePopup.querySelector('img');
const imagePopupCaption = imagePopup.querySelector('figcaption');
const imagePopupCloseBtn = imagePopup.querySelector('.popup__close-btn');

const photos = document.querySelector('.photos');

const cardTemplate = document.querySelector('#card-template').content;

renderPhotos();

// open profile popup
profilePopupOpenBtn.addEventListener('click', function (event) {
  addDataToPopupFromProfile();
  setSubmitBtnState(editInputArray, editSubmitBtn, 'form__button_disabled');
  clearErrors(editInputArray, 'form__input_type_error', 'form__error_visible');
  openPopup(profilePopup);
});
// save data and close profile popup
editForm.addEventListener('submit', function (event) {
  event.preventDefault();
  saveDataToProfileFromPopup();
  closePopup(profilePopup);
});
// close profile popup by close button
profilePopupCloseBtn.addEventListener('click', function (event) {
  closePopup(profilePopup);
});
// close profile popup by overlay
profilePopup.addEventListener('click', closePopupByOverlay);

// open add card popup
addCardPopupOpenBtn.addEventListener('click', function (event) {
  setSubmitBtnState(addInputArray, addSubmitBtn, 'form__button_disabled');
  openPopup(addCardPopup);
});
// add card and close add card popup
addForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const cardData = getCardDataFromAddForm();
  const newCard = createCard(cardData);
  photos.prepend(newCard);
  addForm.reset();
  closePopup(addCardPopup);
});
// close add card popup
addCardPopupCloseBtn.addEventListener('click', function (event) {
  closePopup(addCardPopup);
});
// close add card popup by overlay
addCardPopup.addEventListener('click', closePopupByOverlay);

// close image popup
imagePopupCloseBtn.addEventListener('click', function (event) {
  closePopup(imagePopup);
});
// close image popup by overlay
imagePopup.addEventListener('click', closePopupByOverlay);


// functions
function addDataToPopupFromProfile() {
  editInputName.value = profileName.textContent;
  editInputAbout.value = profileAbout.textContent;
}

function saveDataToProfileFromPopup() {
  profileName.textContent = editInputName.value;
  profileAbout.textContent = editInputAbout.value;
}

function addDataToPopupFromPhoto(img) {
  imagePopupImg.src = img.src;
  imagePopupImg.alt = img.alt;
  imagePopupCaption.textContent = img.alt;
}

function getCardDataFromAddForm() {
  return {
    name: addInputTitle.value,
    link: addInputLink.value
  };
}

function openPopup(popup) {
  document.addEventListener('keydown', closePopupByEscKey);
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  document.removeEventListener('keydown', closePopupByEscKey);
  popup.classList.remove('popup_opened');
}

function deleteCard(img) {
  img.closest('.photo').remove();
}

function toggleLike(btn) {
  btn.classList.toggle('photo__like-btn_active');
}

function renderPhotos() {
  initialCards.forEach(function(cardData) {
    const newCard = createCard(cardData);
    photos.prepend(newCard);
  })
}

function createCard(cardData) {
  const card = cardTemplate.cloneNode(true);
  const cardImg = card.querySelector('.photo__img');
  const cardTitle = card.querySelector('.photo__title');
  const cardDeleteBtn = card.querySelector('.photo__delete-btn');
  const cardLikeBtn = card.querySelector('.photo__like-btn');

  cardImg.src = cardData.link;
  cardImg.alt = cardTitle.textContent = cardData.name;

  // open image popup
  cardImg.addEventListener('click', function(event) {
    addDataToPopupFromPhoto(cardImg);
    openPopup(imagePopup);
  });
  // delete a card
  cardDeleteBtn.addEventListener('click', function (event) {
    deleteCard(cardDeleteBtn);
  });
  // toggle a like
  cardLikeBtn.addEventListener('click', function (event) {
    toggleLike(cardLikeBtn);
  });

  return card;
}

// handle the event when the esc key is pressed
function closePopupByEscKey() {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// handle the event when a overlay is clicked
function closePopupByOverlay() {
  if (event.currentTarget === event.target) {
    closePopup(event.currentTarget);
  }
}
