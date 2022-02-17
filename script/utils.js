import { closePopupByEscKey } from './index.js'

export const openModal = (modal) => {
    modal.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEscKey);
}

