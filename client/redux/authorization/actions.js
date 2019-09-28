import { createAction } from 'redux-actions'

export const init = createAction('INIT');

export const signIn = createAction('SIGN_IN');

export const signInSuccess = createAction('SIGN_IN_SUCCESS');

export const signInFailureEmail = createAction('SIGN_IN_FAILURE_EMAIL');

export const signInFailurePassword = createAction('SIGN_IN_FAILURE_PASSWORD');

export const signUp = createAction('SIGN_UP');

export const signUpSuccess = createAction('SIGN_UP_SUCCESS');

export const signUpFailureEmail = createAction('SIGN_UP_FAILURE_EMAIL');

export const signOut = createAction('SIGN_OUT');

export const signOutSuccess = createAction('SIGN_OUT_SUCCESS');

export const signOutFailure = createAction('SIGN_OUT_FAILURE');

export const showForm = createAction('SHOW_FORM');

export const hideForm = createAction('HIDE_FORM');

export const enterPassword = createAction('ENTER_PASSWORD');

export const enterRepeatPassword = createAction('ENTER_REPEAT_PASSWORD');

export const enterEmail = createAction('ENTER_EMAIL');

export const enterName = createAction('ENTER_NAME');

export const enterLastName = createAction('ENTER_LAST_NAME');

export const passwordIsNotValid = createAction('PASSWORD_IS_NOT_VALID');

export const repeatPasswordIsNotValid = createAction('REPEAT_PASSWORD_IS_NOT_VALID');

export const emailIsNotValid = createAction('EMAIL_IS_NOT_VALID');

export const nameIsNotValid = createAction('NAME_IS_NOT_VALID');

export const lastNameIsNotValid = createAction('LAST_NAME_IS_NOT_VALID');
