import {handleActions} from 'redux-actions'
import * as actions from './actions'

const initialState = {
    users: []
};

const userReducer = handleActions(
    {
        [actions.init]: () => initialState,

        [actions.getUsersSuccess]: (state, {payload}) => ({ users: payload.users }),
    },
    initialState
);

export default userReducer