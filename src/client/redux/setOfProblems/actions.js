import { createAction } from 'redux-actions'

export const init = createAction('INIT');

export const getSets = createAction('GET_SETS');

export const getSetsSuccess = createAction('GET_SETS_SUCCESS');

export const getSetsFailure = createAction('GET_SETS_FAILURE');

export const addSet = createAction('ADD_SET');

export const addSetSuccess = createAction('ADD_SET_SUCCESS');

export const addSetFailure = createAction('ADD_SET_FAILURE');

export const editSet = createAction('EDIT_SET');

export const editSetSuccess = createAction('EDIT_SET_SUCCESS');

export const editSetFailure = createAction('EDIT_SET_FAILURE');

export const deleteSet = createAction('DELETE_SET');

export const deleteSetSuccess = createAction('DELETE_SET_SUCCESS');

export const deleteSetFailure = createAction('DELETE_SET_FAILURE');