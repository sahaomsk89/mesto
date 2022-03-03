export class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._settings = settings;
        this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));

        this._submitBtn = this._form.querySelector(this._settings.submitButtonSelector);
    }

    _showError = (inputElement, errorMessage) => {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

        const { inputErrorClass, errorClass } = this._settings
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(errorClass);
    }

    _hideError = (inputElement) => {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

        const { inputErrorClass, errorClass } = this._settings
        inputElement.classList.remove(inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(errorClass);
    }
    _isValid = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showError(inputElement, inputElement.validationMessage);
        } else {
            this._hideError(inputElement);
        }
    };

    _disableButton = () => {
        const { inactiveButtonClass } = this._settings

        this._submitBtn.classList.add(inactiveButtonClass);
        this._submitBtn.disabled = true;
    };

    _enableButton = () => {
        const { inactiveButtonClass } = this._settings

        this._submitBtn.classList.remove(inactiveButtonClass);
        this._submitBtn.disabled = false;
    };


    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    _setSubmitBtnState = () => {
        if (this._hasInvalidInput()) {
            this._disableButton();
            return;
        }
        this._enableButton();
    }

    resetValidation() {
        this._setSubmitBtnState();
        this._inputList.forEach((inputElement) => {
            this._hideError(inputElement)
        });
    }


    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._setSubmitBtnState();
            });

        });
    }

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._setEventListeners();

    }

}