export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
        this._initialCards = items
    }

    render() {
        this._initialCards.forEach(card => this._renderer(card))
    }

    addInitialItem(element) {
        this._container.prepend(element);
    }

}

