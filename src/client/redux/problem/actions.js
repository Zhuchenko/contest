import { createAction } from 'redux-actions'

export const init = createAction('INIT');

export const getProblems = createAction('GET_PROBLEMS');

export const getProblemsSuccess = createAction('GET_PROBLEMS_SUCCESS');

export const getProblemsFailure = createAction('GET_PROBLEMS_FAILURE');

export const addProblem = createAction('ADD_PROBLEM');

export const addProblemSuccess = createAction('ADD_PROBLEM_SUCCESS');

export const addProblemFailure = createAction('ADD_PROBLEM_FAILURE');

export const editProblem = createAction('EDIT_PROBLEM');

export const editProblemSuccess = createAction('EDIT_PROBLEM_SUCCESS');

export const editProblemFailure = createAction('EDIT_PROBLEM_FAILURE');

export const deleteProblem = createAction('DELETE_PROBLEM');

export const deleteProblemSuccess = createAction('DELETE_PROBLEM_SUCCESS');

export const deleteProblemFailure = createAction('DELETE_PROBLEM_FAILURE');