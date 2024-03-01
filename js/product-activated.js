function handleChangeDescription() {
    const headerDescription = document.querySelector('.text-description')

    const userEmail = sessionStorage.getItem(USER_EMAIL_SS_KEY)
    const maskedEmail = maskEmail(userEmail)

    headerDescription.textContent =
        `Подробная информация о портале Keenetic Wi-Fi Дом.ру отправлена на ваш e-mail ${ maskedEmail }`
}

document.addEventListener('DOMContentLoaded', () => {
    handleChangeDescription()
})
