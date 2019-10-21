const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const DIGITS = /\d/;
const LOWER_CASE = /[a-z]+/;
const UPPER_CASE = /[A-Z]+/;
const SPEC_SYMBOL = /[ !"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]+/;

export const validateEmail = (email) => EMAIL_REGEX.test(email);

export const validatePassword = (password) => !(password.length < 8 || !DIGITS.test(password) || !LOWER_CASE.test(password) || !UPPER_CASE.test(password) || !SPEC_SYMBOL.test(password));

/*
Length > 8
Uppercase characters (A-Z)
Lowercase characters (a-z)
Digits (0-9)
Special characters: space or (!"#$%&'()*+,-./:;<=>?@[]^_`{|}~)
*/

export const validateRepeatPassword = (password, repeatPassword) => !!repeatPassword && password === repeatPassword;

export const validateInput = (value) => !!value;