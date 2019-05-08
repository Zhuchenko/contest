export const validateEmail = (email) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)){
        return 'email is not valid'
    }
    else return '';
};

export const validatePassword = (password) => {
    const digits = /\d/;
    const lowercase = /[a-z]+/;
    const uppercase = /[A-Z]+/;
    const specSymbol = /[ !"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]+/;

    if (password.length < 8) {
        return 'password is too short'
    }
    if (password.test(digits)) {
        return 'password has no digits'
    }
    if (password.test(lowercase)) {
        return 'password has no lowercase characters'
    }
    if (password.test(uppercase)) {
        return 'password has no uppercase characters'
    }
    if (password.test(specSymbol)) {
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
    if (password !== repeatPassword){
        return 'repeat password does not match'
    }
    return ''
};

export const validateInput = (value) => {
    if (value){
        return 'it is required'
    }
    return ''
};