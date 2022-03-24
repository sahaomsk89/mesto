export class Card {
    constructor(data, cardTemplateSelector, handleCardClick, { handleDeliteClick, handlelikeClick }, userId) {
        this._data = data;
        this._template = document.querySelector(cardTemplateSelector).content.querySelector('.gallery__cart');
        this._link = data.link;
        this._name = data.name;
        // console.log(data.likes);
        this._likes = data.likes;
        this._id = data._id;
        this._userId = userId;
        // console.log(data.owner);
        this._ownerId = data.owner._id;
        this._handleCardClick = handleCardClick;
        //console.log(handleDeliteClick);
        this._handleDeliteClick = handleDeliteClick;
        this._handlelikeClick = handlelikeClick;

    }


    deleteHandler = () => {
        this._cardElement.remove()
        //  this._cardElement = null
    }

    _setEventListeners() {
        this._deleteButton.addEventListener("click", () => this._handleDeliteClick(this._id));
        // console.log(this);
        this._likeButton.addEventListener("click", () => this._handlelikeClick(this._id));
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        });

    }


    _likeClickAdd = () => {
        this._likeButton.classList.add('gallery__button_active');
    }

    _likeClickDelete = () => {
        this._likeButton.classList.remove('gallery__button_active');
    }



    isLiked() {
        const userHandleLikeCard = this._likes.find(user => user._id === this._userId)
        return userHandleLikeCard;
    }

    setLikes(newLikes) {
        this._likes = newLikes
        const likeCountElement = this._cardElement.querySelector('.card-like-count');
        likeCountElement.textContent = this._likes.length;

        if (this.isLiked()) {
            this._likeClickAdd()
        } else {
            this._likeClickDelete()
        }

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

        this.setLikes(this._likes)
        //подписки
        this._setEventListeners()

        if (this._ownerId !== this._userId) {
            this._deleteButton.style.display = 'none'
        }

        return this._cardElement;


    }
}


