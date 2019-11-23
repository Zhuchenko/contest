import { createAction } from 'redux-actions'

export const init = createAction('INIT');

export const getContests = createAction('GET_CONTESTS');

export const getContestsSuccess = createAction('GET_CONTESTS_SUCCESS');

export const getContestsFailure = createAction('GET_CONTESTS_FAILURE');

export const addContest = createAction('ADD_CONTEST');

export const addContestSuccess = createAction('ADD_CONTEST_SUCCESS');

export const addContestFailure = createAction('ADD_CONTEST_FAILURE');

export const editContest = createAction('EDIT_CONTEST');

export const editContestSuccess = createAction('EDIT_CONTEST_SUCCESS');

export const editContestFailure = createAction('EDIT_CONTEST_FAILURE');

export const deleteContest = createAction('DELETE_CONTEST');

export const deleteContestSuccess = createAction('DELETE_CONTEST_SUCCESS');

export const deleteContestFailure = createAction('DELETE_CONTEST_FAILURE');