export const validateEmail = (email) => {
    const isEmpty = validateInput(email);

    if(isEmpty) {
        return isEmpty;
    }

    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)){
        return 'email is not valid'
    }
    else return '';
};

export const validatePassword = (password) => {
    const isEmpty = validateInput(password);
    if(isEmpty) {
        return isEmpty;
    }

    const digits = /\d/;
    const lowercase = /[a-z]+/;
    const uppercase = /[A-Z]+/;
    const specSymbol = /[ !"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]+/;

    if (password.length < 8) {
        return 'password is too short'
    }
    if (!digits.test(password)) {
        return 'password has no digits'
    }
    if (!lowercase.test(password)) {
        return 'password has no lowercase characters'
    }
    if (!uppercase.test(password)) {
        return 'password has no uppercase characters'
    }
    if (!specSymbol.test(password)) {
        return 'password has no special characters'
    }
    return '';
};
/*
Length > 8
Uppercase characters (A-Z)
Lowercase characters (a-z)
Digits (0-9)
Special characters: space or (!"#$%&'()*+,-./:;<=>?@[]^_`{|}~)
*/

export const validateRepeatPassword = (password, repeatPassword) =>{
    const isEmpty = validateInput(repeatPassword);
    if(isEmpty) {
        return isEmpty;
    }

    if (password !== repeatPassword){
        return 'repeat password does not match'
    }
    return ''
};

export const validateInput = (value) => {
    if (!value){
        return 'it is required'
    }
    return ''
};