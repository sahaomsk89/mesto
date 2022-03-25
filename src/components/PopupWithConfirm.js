import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor({ popupSelector }) {
        super(popupSelector);
        this._buttonSubmit = this._popup.querySelector('.popup-form__button');
    }

    changeSubmitHandler(data) {
        this._handleSubmit = data;
    }

    setEventListeners() {
        super.setEventListeners();
        this._buttonSubmit.addEventListener('click', (event) => {
            event.preventDefault();
            this._handleSubmit()
        });
    }

}
