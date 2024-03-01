// OTP
function updateInput() {
    const inputs = document.querySelectorAll("#otp_confirm_sms .otp-input__field");
    const hiddenInputOtpValue = document.querySelector("#otp_confirm_sms input[name=otp_value]")
    const submitBtn = document.querySelector('#btn_submit_confirm_phone_sms')

    let inputValue = Array.from(inputs).reduce(function (otp, input) {
        otp += (input.value.length) ? input.value : '';
        return otp;
    }, "");
    hiddenInputOtpValue.value = inputValue;
    inputValue.length === 4
        ? submitBtn.disabled = false
        : submitBtn.disabled = true
}

function handleOTPInputBehaviour() {
    const inputs = document.querySelectorAll(".otp-input__field");

    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];

        input.addEventListener("input", function () {
            if (input.value.length == 1 && i + 1 < inputs.length) {
                inputs[i + 1].focus();
            } else if (input.value.length > 1) {
                input.value = input.value.replace(/\D/g, '').split('').forEach((char, index) => {
                    if (i + index < inputs.length) inputs[i + index].value = char;
                });
                inputs[Math.min(inputs.length - 1, i + input.value.length)].focus();
            }
            updateInput();
        });

        input.addEventListener("keydown", function (e) {
            if ((e.keyCode == 8 || e.keyCode == 46) && input.value == '' && i != 0) {
                for (let pos = i; pos < inputs.length - 1; pos++) {
                    inputs[pos].value = inputs[pos + 1].value;
                }
                inputs[i - 1].value = '';
                inputs[i - 1].focus();
                updateInput();
                if (e.keyCode == 46) {
                    input.select();
                    e.preventDefault();
                }
            } else if (e.keyCode == 37 && i > 0) {
                e.preventDefault();
                inputs[i - 1].focus();
                inputs[i - 1].select();
            } else if (e.keyCode == 39 && i + 1 < inputs.length) {
                e.preventDefault();
                inputs[i + 1].focus();
                inputs[i + 1].select();
            }
        });
    }
}


function getAndMaskUserPhoneNumber() {
    const userPhoneNumber = sessionStorage.getItem(USER_PHONE_NUMBER_SS_KEY)
    return maskPhoneNumber(userPhoneNumber)
}

function changeDescriptionText() {
    const headerDescription = document.querySelector('.text-description')
    headerDescription.textContent = `Мы отправили его на номер ${ getAndMaskUserPhoneNumber() }`
}

document.addEventListener('DOMContentLoaded', () => {
    handleOTPInputBehaviour()
    changeDescriptionText()
    
    const submitBtn = document.querySelector('#btn_submit_confirm_phone_sms')
    submitBtn.addEventListener('click', () => {
        history.pushState({}, '', 'product-activated.html')
    })
})
