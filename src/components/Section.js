export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    /*  render(card) {
               this.clear();
        this._initialCards.forEach(card => this._renderer(card))
    }

    addInitialItem(element) {
        this._container.prepend(element);
    }*/

    addInitialItem(item) {
        this._container.prepend(item);
    };

    clear() {
        this._cardElement = null;
    }

    renderItems(items) {
        this.clear();

        items.forEach((item) => {
            this._renderer(item);
        });
    }


}
