import {handleActions} from 'redux-actions'
import * as actions from './actions'

const initialState = {
    contests: []
};

const groupReducer = handleActions(
    {
        [actions.init]: () => initialState,

        [actions.getContestsSuccess]: (state, {payload}) => ({ contests: payload.contests }),
    },
    initialState
);

export default groupReducer