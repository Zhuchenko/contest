import {handleActions} from 'redux-actions'
import * as actions from './actions'

const initialState = {
    sets: []
};

const setReducer = handleActions(
    {
        [actions.init]: () => initialState,

        [actions.getSetsSuccess]: (state, {payload}) => ({ sets: payload.sets }),
    },
    initialState
);

export default setReducer