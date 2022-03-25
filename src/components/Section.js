export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

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
