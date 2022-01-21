function enableValidation(obj) {
    const formElements = document.querySelectorAll(obj.formSelector);
    formElements.forEach(function (formElement) {
        setEventListeners(formElement, obj);
    });
}

function setEventListeners(formElement, obj) {
    const inputElements = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const submitBtn = formElement.querySelector(obj.submitButtonSelector);

    inputElements.forEach(function (inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.addEventListener('input', function () {
            isValid(inputElement, errorElement, obj);
            setSubmitBtnState(inputElements, submitBtn, obj.inactiveButtonClass);
        });

    });
}

function showError(inputElement, errorElement, errorMessage, inputErrorClass, errorClass) {
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
}

function hideError(inputElement, errorElement, inputErrorClass, errorClass) {
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
}

function isValid(inputElement, errorElement, obj) {
    if (!inputElement.validity.valid) {
        showError(inputElement, errorElement, inputElement.validationMessage, obj.inputErrorClass, obj.errorClass);
    } else {
        hideError(inputElement, errorElement, obj.inputErrorClass, obj.errorClass);
    }
}

function setSubmitBtnState(inputElements, submitBtn, inactiveButtonClass) {
    if (hasInvalidInput(inputElements)) {
        hideSubmitButton(submitBtn, inactiveButtonClass);
        return;
    }
    showSubmitButton(submitBtn, inactiveButtonClass);
}

function showSubmitButton(submitBtn, inactiveButtonClass) {
    submitBtn.classList.remove(inactiveButtonClass);
    submitBtn.disabled = false;
}

function hideSubmitButton(submitBtn, inactiveButtonClass) {
    submitBtn.classList.add(inactiveButtonClass);
    submitBtn.disabled = true;
}

function hasInvalidInput(inputElements) {
    return inputElements.some(function (inputElement) {
        return !inputElement.validity.valid;
    });
}

function clearErrors(inputElementsArray, inputErrorClass, errorClass) {
    inputElementsArray.forEach(function (inputElement) {
        const errorElement = document.querySelector(`.${inputElement.id}-error`);
        hideError(inputElement, errorElement, inputErrorClass, errorClass);
    });
}

enableValidation({
    formSelector: '.popup-form',
    inputSelector: '.popup-form__input',
    submitButtonSelector: '.popup-form__button',
    inactiveButtonClass: 'popup-form__button_disabled',
    inputErrorClass: 'popup-form__input_type_error',
    errorClass: 'popup-form__error_visible'
});
