import {handleActions} from 'redux-actions'
import * as actions from './actions'

const initialState = {
    isShown: false,
    errorMessage: ''
};

const reducer = handleActions(
    {
        [actions.init]: () => initialState,

        [actions.signInSuccess]: () => initialState,

        [actions.signInFailure]: (state, {payload}) => ({
            isShown: true,
            errorMessage: payload.errorMessage
        }),

        [actions.signUpSuccess]: () => initialState,

        [actions.signUpFailure]: (state, {payload}) => ({
            isShown: true,
            errorMessage: payload.errorMessage
        }),

        [actions.signOutSuccess]: () => initialState,

        [actions.showForm]: () => ({
            isShown: true,
            errorMessage: ''
        }),

        [actions.hideForm]: () => initialState,
    },
    initialState
);

export default reducer