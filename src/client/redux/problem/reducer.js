import {handleActions} from 'redux-actions'
import * as actions from './actions'

const initialState = {
    problems: []
};

const problemReducer = handleActions(
    {
        [actions.init]: () => initialState,

        [actions.getProblemsSuccess]: (state, {payload}) => ({ problems: payload.problems }),
    },
    initialState
);

export default problemReducer