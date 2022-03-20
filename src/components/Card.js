export class Card {
    constructor(data, cardTemplateSelector, handleCardClick, handleDeliteClick) {
        this._data = data;
        this._template = document.querySelector(cardTemplateSelector).content.querySelector('.gallery__cart');
        this._link = data.link;
        this._name = data.name;
        this._likes = data.likes;
        this._id = data._id;
        this._handleCardClick = handleCardClick;
        this._handleDeliteClick = handleDeliteClick;

    }


    _likeClickHandler = () => {
        this._likeButton.classList.toggle('gallery__button_active');
    }

    _deleteHandler = () => {
        this._cardElement.remove()
    }

    _setEventListeners() {
        this._deleteButton.addEventListener("click", () => this._handleDeliteClick(this._id));
        this._likeButton.addEventListener("click", () => this._likeClickHandler(this._id));
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        });

    }

    _setLikes() {
        const likeCountElement = this._cardElement.querySelector('.card-like-count');
        likeCountElement.textContent = this._likes.length;

    }


    getCardElement = () => {
        this._cardElement = this._template.cloneNode(true);

        //нашли
        this._cardImage = this._cardElement.querySelector('.gallery__item');
        this._cardTitle = this._cardElement.querySelector('.gallery__title');
        this._deleteButton = this._cardElement.querySelector('.gallery__delete-button');
        this._likeButton = this._cardElement.querySelector('.gallery__button')

        this._cardTitle.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        this._setLikes()
        //подписки
        this._setEventListeners()



        return this._cardElement;
    }
}
