import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._addPopupImagelink = this._popup.querySelector('.popup__image-link');;
        this._addPopupImageName = this._popup.querySelector('.popup__place-name');;
    }

    open(name, link) {
        this._addPopupImageName.textContent = name;
        this._addPopupImagelink.src = link;
        this._addPopupImageName.alt = name;
        super.open();
    }
}
