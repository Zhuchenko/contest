import { createAction } from 'redux-actions'

export const init = createAction('INIT')

export const initSuccessAuthorized = createAction('INIT_SUCCESS_AUTHORIZED')

export const initSuccessNotAuthorized = createAction('INIT_SUCCESS_NOT_AUTHORIZED')

export const initFailure = createAction('INIT_FAILURE')