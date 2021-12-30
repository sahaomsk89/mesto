let profile = document.querySelector('.profile');
let profileEditButton = profile.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let popupCloseButton = popupContainer.querySelector('.popup__close');
// Находим форму в DOM
let formElement = popup.querySelector('.popup-form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup-form__input_name');
let jobInput = formElement.querySelector('.popup-form__input_job');
let profileTitle = profile.querySelector('.profile__title');
let profileSabtitle = profile.querySelector('.profile__subtitle');

function openPopup() {
    nameInput.value = profileTitle.textContent
    jobInput.value = profileSabtitle.textContent
    popup.classList.add('popup__opened');
}

function popupClose() {
    popup.classList.remove('popup__opened');
}
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault();
    // Эта строчка отменяет стандартную отправку формы.
    profileTitle.textContent = nameInput.value
    profileSabtitle.textContent = jobInput.value
    popupClose();
}

profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler); 
