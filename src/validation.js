//Validation of all the input fields of form

function nameValidation(name) {
    if (name.trim().length === 0) {
        return false;
    }

    return true;
}

function emailValidation(email) {
    if (email.trim().length === 0) {
        return false;
    }

    return true;
}

function phoneNumberValidation(phoneNumber) {
    if (phoneNumber.trim().length === 0) {
        return false;
    }

    return true;
}

function genderValidation(gender) {
    if (gender === '') {
        return false;
    }

    return true;
}

function locationValidation(location) {
    if (location === '') {
        return false;
    }

    return true;
}

export {nameValidation, emailValidation, phoneNumberValidation, genderValidation, locationValidation};