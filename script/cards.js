import { openModal } from './utils.js'
import { modalCardView, addPopupImageName, addPopupImagelink } from './constants.js'

export class Card {
    constructor(data, cardTemplateSelector) {
        this._data = data;
        this._template = document.querySelector(cardTemplateSelector).content.querySelector('.gallery__cart');
        this._link = data.link;
        this._name = data.name;
    }

    _openPopupImage = () => {
        addPopupImageName.textContent = this._cardTitle.textContent;
        addPopupImagelink.src = this._cardImage.src;
        openModal(modalCardView);
    }


    _likeClickHandler = () => {
        this._likeButton.classList.toggle('gallery__button_active');
    }

    _deleteHandler = () => {
        this._cardElement.remove()
    }

    _setEventListeners() {
        this._deleteButton.addEventListener("click", this._deleteHandler)
        this._likeButton.addEventListener("click", this._likeClickHandler)
        this._viewCardButton.addEventListener('click', this._openPopupImage)
    }

    getCardElement = () => {
        this._cardElement = this._template.cloneNode(true);

        //нашли
        this._cardImage = this._cardElement.querySelector('.gallery__item');
        this._cardTitle = this._cardElement.querySelector('.gallery__title');
        this._deleteButton = this._cardElement.querySelector('.gallery__delete-button');
        this._likeButton = this._cardElement.querySelector('.gallery__button')
        this._viewCardButton = this._cardElement.querySelector('.gallery__view-button');

        this._cardTitle.textContent = this._name;
        this._cardImage.src = this._link;

        //подписки
        this._setEventListeners()

        return this._cardElement;
    }
}





