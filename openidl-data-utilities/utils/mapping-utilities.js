
module.exports.convertDate = function convertDate(inputDate) {
    return `200${inputDate.substring(2, 3)}-${inputDate.substring(0, 2)}-01`
}

const lastDigitMapping = {
    "}": -0,
    "J": -1,
    "K": -2,
    "L": -3,
    "M": -4,
    "N": -5,
    "O": -6,
    "P": -7,
    "Q": -8,
    "R": -9,
    "{": 0,
    "A": 1,
    "B": 2,
    "C": 3,
    "D": 4,
    "E": 5,
    "F": 6,
    "G": 7,
    "H": 8,
    "I": 9,
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9
}

module.exports.convertNumber = function convertNumber(numberText, decimals = true) {
    let length = numberText.length
    let signChar = numberText.substring(length - 1, length)
    let signNum = lastDigitMapping[signChar]
    let result = `${numberText.substring(1, length - 2)}${decimals ? '.' : ''}${numberText.substring(length - 2, length - 1)}${signNum}`
    return result
}