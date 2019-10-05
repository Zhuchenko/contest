import {handleActions} from 'redux-actions'
import * as actions from './actions'

const initialState = {
    users: []
};

const userReducer = handleActions(
    {
        [actions.init]: state => ({
            ...state,
            users: initialState.users
        }),

        [actions.getUsersSuccess]: (state, {payload}) => ({
            ...state,
            users: payload.users
        }),

    },
    initialState
);

export default userReducer