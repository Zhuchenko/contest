import { createAction } from 'redux-actions'

export const init = createAction('INIT');

export const signin = createAction('SIGNIN');

export const signinSuccess = createAction('SIGNIN_SUCCESS');

export const signinFailure = createAction('SIGNIN_FAILURE');

export const signup = createAction('SIGNUP');

export const signupSuccess = createAction('SIGNUP_SUCCESS');

export const signupFailure = createAction('SIGNUP_FAILURE');

export const signout = createAction('SIGNOUT');

export const signoutSuccess = createAction('SIGNOUT_SUCCESS');

export const signoutFailure = createAction('SIGNOUT_FAILURE');

export const showForm = createAction('SHOW_FORM');

export const hideForm = createAction('HIDE_FORM');

export const enterPassword = createAction('ENTER_PASSWORD');

export const enterUsername = createAction('ENTER_USERNAME');