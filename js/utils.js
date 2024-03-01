/**
 * 
 * @param {callback} func 
 * @param {number} wait 
 * @param {boolean} immediate 
 * @returns 
 */
function debounce(func, wait = 100, immediate) {
    let timeout

    return function executingFunc() {
        const context = this
        const args = arguments

        const later = function() {
            timeout = null
            if (!immediate) func.apply(context, args)
        }

        const callNow = immediate && !timeout

        clearTimeout(timeout)

        timeout = setTimeout(later, wait)

        if (callNow) func.apply(context, args)
    }
}


function formatPhoneNumber(rawNum) {
    const codePartEnd = 3
    const firstNumPartEnd = 6
    const middleNumPartEnd = 8
    const lastNumPartEnd = 10

    let sNum = String(rawNum).replace(/[^\d]/g, '')
    if (!sNum.length)
        return ''
    if (sNum === '7' || sNum === '8')
        return '+7'

    // эт для возможности начала ввода без семерки
    if (sNum.startsWith('7'))
        sNum = sNum.slice(1)
    if (sNum.length > lastNumPartEnd)
        sNum = sNum.slice(0, lastNumPartEnd)

    const codePart = sNum.slice(0, codePartEnd)
    const firstNumPart = sNum.slice(codePartEnd, firstNumPartEnd)
    const middleNumPart = sNum.slice(firstNumPartEnd, middleNumPartEnd)
    const lastNumPart = sNum.slice(middleNumPartEnd, lastNumPartEnd)

    if (sNum.length <= codePartEnd)
        return `+7 ${ codePart }`
    if (sNum.length <= firstNumPartEnd)
        return `+7 ${ codePart } ${ firstNumPart }`
    if (sNum.length <= middleNumPartEnd)
        return `+7 ${ codePart } ${ firstNumPart }-${ middleNumPart }`
    if (sNum.length <= lastNumPartEnd)
        return `+7 ${ codePart } ${ firstNumPart }-${ middleNumPart }-${ lastNumPart }`
}

function maskPhoneNumber(phoneNumber) {
    const groups = phoneNumber.split(/[\s-]/);
    
    for (let i = 2; i < groups.length - 1; i++) {
        groups[i] = '*'.repeat(groups[i].length);
    }
    
    return groups.join(' ').replace(/\d(?=\d{2}(\d{2})?$)/g, '*');
}

function maskEmail(email) {
    return email?.replace(/^(.{3}).*@/, '$1***@')
}
