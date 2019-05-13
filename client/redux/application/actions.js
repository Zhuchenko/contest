import { createAction } from 'redux-actions'

export const init = createAction('INIT')

export const authorized = createAction('AUTHORIZED')

export const notAuthorized = createAction('NOT_AUTHORIZED')

export const initFailure = createAction('INIT_FAILURE')