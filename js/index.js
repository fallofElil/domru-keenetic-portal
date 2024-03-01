// user data form
// https://html.spec.whatwg.org/multipage/input.html#input.email.attrs.value.single
const RE_EMAIL_VALIDATION = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
const DEBOUNCE_TIMEOUT = 600

const TEXT_FIELD_ERROR_CLASSNAME = 'text-field__input--error'
const ERROR_HELPER_TEXT_CLASSNAMES = ['text-field__helper-text--visible', 'text-field__helper-text--error']


function handleUserRegistration() {
    const inputName = document.querySelector('#input_name')
    const inputNameHelperText = document.querySelector('#input_name_helper_text')
    const inputEmail = document.querySelector('#input_email')
    const inputEmailHelperText = document.querySelector('#input_email_helper_text')
    const inputPhone = document.querySelector('#input_phone')
    const inputPhoneHelperText = document.querySelector('#input_phone_helper_text')
    const inputPromo = document.querySelector('#input_promo')
    const inputPromoHelperText = document.querySelector('#input_promo_helper_text')

    const submitUserDataBtn = document.querySelector('#btn_submit_user_data')

    let fieldsValidationStates = {
        name: false,
        email: false,
        phone: false,
        promo: true,
    }

    function checkFormValidity() {
        submitUserDataBtn.disabled = Object.values(fieldsValidationStates).includes(false)
    }

    function validateName() {
        if (inputName?.value.trim() === "") {
            inputName.classList.add(TEXT_FIELD_ERROR_CLASSNAME)
            inputNameHelperText.classList.add(...ERROR_HELPER_TEXT_CLASSNAMES)
            inputNameHelperText.textContent = "Обязательно для заполнения";
            fieldsValidationStates.name = false
        } else {
            inputName.classList.remove(TEXT_FIELD_ERROR_CLASSNAME)
            inputNameHelperText.classList.remove(...ERROR_HELPER_TEXT_CLASSNAMES)
            inputNameHelperText.textContent = "";
            fieldsValidationStates.name = true
        }
        checkFormValidity();
    }

    function validateEmail() {
        if (!inputEmail.value) {
            inputEmail.classList.add(TEXT_FIELD_ERROR_CLASSNAME)
            inputEmailHelperText.classList.add(...ERROR_HELPER_TEXT_CLASSNAMES)
            inputEmailHelperText.textContent = "Обязательно для заполнения";
            fieldsValidationStates.email = false
        } else if (!RE_EMAIL_VALIDATION.test(inputEmail.value)) {
            inputEmail.classList.add(TEXT_FIELD_ERROR_CLASSNAME)
            inputEmailHelperText.classList.add(...ERROR_HELPER_TEXT_CLASSNAMES)
            inputEmailHelperText.textContent = "Поле заполнено неверно";
            fieldsValidationStates.email = false
        } else {
            inputEmail.classList.remove(TEXT_FIELD_ERROR_CLASSNAME)
            inputEmailHelperText.classList.remove(...ERROR_HELPER_TEXT_CLASSNAMES)
            inputEmailHelperText.textContent = "";
            fieldsValidationStates.email = true
        }
        checkFormValidity();
    }

    function validatePhoneNumber() {
        const cleanedPhoneValue = inputPhone.value.replace(/\D/g, '')
        if (cleanedPhoneValue.length !== 11) {
            inputPhone.classList.add(TEXT_FIELD_ERROR_CLASSNAME)
            inputPhoneHelperText.classList.add(...ERROR_HELPER_TEXT_CLASSNAMES)
            inputPhoneHelperText.textContent = "Поле заполнено неверно";
            fieldsValidationStates.phone = false
        } else {
            inputPhone.classList.remove(TEXT_FIELD_ERROR_CLASSNAME)
            inputPhoneHelperText.classList.remove(...ERROR_HELPER_TEXT_CLASSNAMES)
            inputPhoneHelperText.textContent = "";
            fieldsValidationStates.phone = true
        }
        checkFormValidity();
    }

    function validatePromo() {
        const promoValue = inputPromo.value
        const regex = /^[a-zA-Z0-9]+$/;

        if (!promoValue) {
            inputPromo.classList.remove(TEXT_FIELD_ERROR_CLASSNAME)
            inputPromoHelperText.classList.remove(...ERROR_HELPER_TEXT_CLASSNAMES)
            inputPromoHelperText.textContent = "";
            fieldsValidationStates.promo = true
        } else if ((promoValue.length < 5 || promoValue.length > 7) || !regex.test(promoValue)) {
            inputPromo.classList.add(TEXT_FIELD_ERROR_CLASSNAME)
            inputPromoHelperText.classList.add(...ERROR_HELPER_TEXT_CLASSNAMES)
            inputPromoHelperText.textContent = "Поле заполнено неверно";
            fieldsValidationStates.promo = false
        } else {
            inputPromo.classList.remove(TEXT_FIELD_ERROR_CLASSNAME)
            inputPromoHelperText.classList.remove(...ERROR_HELPER_TEXT_CLASSNAMES)
            inputPromoHelperText.textContent = "";
            fieldsValidationStates.promo = true
        }
        checkFormValidity();
    }

    function handleSaveUserDataToSessionStorage() {
        sessionStorage.setItem(USER_EMAIL_SS_KEY, inputEmail.value)
        sessionStorage.setItem(USER_PHONE_NUMBER_SS_KEY, inputPhone.value)
    }

    inputName.addEventListener('input', debounce(validateName, DEBOUNCE_TIMEOUT))
    inputEmail.addEventListener('input', debounce(validateEmail, DEBOUNCE_TIMEOUT))
    inputPhone.addEventListener('input', () => {
        const formattedValue = formatPhoneNumber(inputPhone.value)
        inputPhone.value = formattedValue
        debounce(validatePhoneNumber, DEBOUNCE_TIMEOUT)()
    })
    inputPromo.addEventListener('input', () => {
        let promoValue = inputPromo.value
        promoValue = promoValue?.toUpperCase()
        promoValue = promoValue?.length > 7
            ? promoValue.slice(0, 7)
            : promoValue
        inputPromo.value = promoValue
        debounce(validatePromo, DEBOUNCE_TIMEOUT)()
    })

    submitUserDataBtn.addEventListener('click', () => {
        handleSaveUserDataToSessionStorage()
        history.pushState({}, '', 'confirm-call.html')
    })
}

document.addEventListener('DOMContentLoaded', () => {
    handleUserRegistration()
})
