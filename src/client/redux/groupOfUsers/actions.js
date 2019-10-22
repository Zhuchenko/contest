import { createAction } from 'redux-actions'

export const init = createAction('INIT');

export const getGroups = createAction('GET_GROUPS');

export const getGroupsSuccess = createAction('GET_GROUPS_SUCCESS');

export const getGroupsFailure = createAction('GET_GROUPS_FAILURE');

export const addGroup = createAction('ADD_GROUP');

export const addGroupSuccess = createAction('ADD_GROUP_SUCCESS');

export const addGroupFailure = createAction('ADD_GROUP_FAILURE');

export const editGroup = createAction('EDIT_GROUP');

export const editGroupSuccess = createAction('EDIT_GROUP_SUCCESS');

export const editGroupFailure = createAction('EDIT_GROUP_FAILURE');

export const deleteGroup = createAction('DELETE_GROUP');

export const deleteGroupSuccess = createAction('DELETE_GROUP_SUCCESS');

export const deleteGroupFailure = createAction('DELETE_GROUP_FAILURE');