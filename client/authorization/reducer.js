import {handleActions} from 'redux-actions'
import * as actions from './actions'

const initialState = {
    isShown: false,
    password: '',
    username: ''
};

const reducer = handleActions(
    {
        [actions.init]: state => ({
            ...state,
            isShown: initialState.isShown,
            password: initialState.password,
            username: initialState.username
        }),

        [actions.signinSuccess]: state => ({
            ...state,
            isShown: false,
            password: '',
            username: ''
        }),

        [actions.signinFailure]: state => ({
            ...state,
            isShown: true,
            password: '',
            username: ''
        }),

        [actions.signupSuccess]: state => ({
            ...state,
            isShown: false,
            password: '',
            username: ''
        }),

        [actions.signupFailure]: state => ({
            ...state,
            isShown: true,
            password: '',
            username: ''
        }),

        [actions.signoutSuccess]: state => ({
            ...state,
            isShown: false,
            password: '',
            username: ''
        }),

        [actions.signoutFailure]: state => ({
            ...state,
            isShown: false,
            password: '',
            username: ''
        }),

        [actions.showForm]: state => ({
            ...state,
            isShown: true,
            password: '',
            username: ''
        }),

        [actions.hideForm]: state => ({
            ...state,
            isShown: false,
            password: '',
            username: ''
        }),

        [actions.enterUsername]: (state, {payload}) => ({
            ...state,
            username: payload.username
        }),

        [actions.enterPassword]: (state, {payload}) => ({
            ...state,
            password: payload.password
        }),

    },
    initialState
);

export default reducer