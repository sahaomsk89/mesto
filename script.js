let profile = document.querySelector('.profile');
let profileEditButton = profile.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let closePopup = popupContainer.querySelector('.popup__close');

function openPopup() {
    popup.classList.add('popup_opened');

}
profileEditButton.addEventListener('click', openPopup);

function Popupclose() {
    popup.classList.remove('popup_opened');

}
closePopup.addEventListener('click', Popupclose);

// Находим форму в DOM
let formElement = popup.querySelector('.popup-form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup-form__name');
let jobInput = formElement.querySelector('.popup-form__job');
let profileTitle = profile.querySelector('.profile__title');
let profileSabtitle = profile.querySelector('.profile__sabtitle');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault();
    // Эта строчка отменяет стандартную отправку формы.
    profileTitle.textContent = nameInput.value
    profileSabtitle.textContent = jobInput.value
    popup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 