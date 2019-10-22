import {handleActions} from 'redux-actions'
import * as actions from './actions'

const initialState = {
    groups: []
};

const groupReducer = handleActions(
    {
        [actions.init]: () => initialState,

        [actions.getGroupsSuccess]: (state, {payload}) => ({ groups: payload.groups }),
    },
    initialState
);

export default groupReducer