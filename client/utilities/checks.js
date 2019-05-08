export const validateEmail = (email) => {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

export const validatePassword = (password) =>{
    let digits = /\d/;
    let upperCase = /[A-Z]+/;
    let lowerCase = /[a-z]+/;
    let specSymbol = /[ !"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]+/;

    return (password.length >= 8
        && password.test(digits)
        && password.test(upperCase)
        && password.test(lowerCase)
        && password.test(specSymbol));
};

export const validateRepeatPassword = (password, repeatPassword) =>{
    return (password === repeatPassword);
};

export const validateInput = (value) => {
    return !!value;
};