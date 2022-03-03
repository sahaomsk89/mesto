import Popup from './Popup.js';
import { addPopupImageName, addPopupImagelink } from '../utils/constants.js'


export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._addPopupImagelink = addPopupImagelink;
        this._addPopupImageName = addPopupImageName;
    }

    open(name, link) {
        this._addPopupImageName.textContent = name;
        this._addPopupImagelink.src = link;
        this._addPopupImageName.alt = name;
        super.open();
    }
}
