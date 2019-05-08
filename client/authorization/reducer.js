import {handleActions} from 'redux-actions'
import * as actions from './actions'

const initialState = {
    isShown: false,

    input: {
        value: '',
        isValid: true,
        errorMessage: ''
    }
};

const reducer = handleActions(
    {
        [actions.init]: state => ({
            ...state,
            isShown: initialState.isShown,

            username: initialState.input,
            password: initialState.input,
            repeatPassword: initialState.input,
            email: initialState.input,
            name: initialState.input,
            lastname: initialState.input
        }),

        [actions.signinSuccess]: state => ({
            ...state,
            isShown: false,

            username: initialState.input,
            password: initialState.input,
            repeatPassword: initialState.input,
            email: initialState.input,
            name: initialState.input,
            lastname: initialState.input
        }),

        [actions.signinFailure]: (state, {payload}) => ({    //validation
            ...state,
            isShown: true,

            username: {
                value: '',
                isValid: payload.username.isValid,
                errorMessage: payload.username.errorMessage
            },
            password: {
                value: '',
                isValid: payload.password.isValid,
                errorMessage: payload.password.errorMessage
            },

            repeatPassword: initialState.input,
            email: initialState.input,
            name: initialState.input,
            lastname: initialState.input
        }),

        [actions.signupSuccess]: state => ({
            ...state,
            isShown: false,

            username: initialState.input,
            password: initialState.input,
            repeatPassword: initialState.input,
            email: initialState.input,
            name: initialState.input,
            lastname: initialState.input
        }),

        [actions.signupFailure]: (state, {payload}) => ({    //validation
            ...state,
            isShown: true,

            username: {
                value: '',
                isValid: payload.username.isValid,
                errorMessage: payload.username.errorMessage
            },
            email: {
                value: '',
                isValid: payload.email.isValid,
                errorMessage: payload.email.errorMessage
            },
            password: initialState.input,
            repeatPassword: initialState.input,
            name: initialState.input,
            lastname: initialState.input
        }),

        [actions.signoutSuccess]: state => ({
            ...state,
            isShown: false,

            username: initialState.input,
            password: initialState.input,
            repeatPassword: initialState.input,
            email: initialState.input,
            name: initialState.input,
            lastname: initialState.input
        }),

        [actions.signoutFailure]: state => ({
            ...state,
            isShown: false,

            username: initialState.input,
            password: initialState.input,
            repeatPassword: initialState.input,
            email: initialState.input,
            name: initialState.input,
            lastname: initialState.input
        }),

        [actions.showForm]: state => ({
            ...state,
            isShown: true,

            username: initialState.input,
            password: initialState.input,
            repeatPassword: initialState.input,
            email: initialState.input,
            name: initialState.input,
            lastname: initialState.input
        }),

        [actions.hideForm]: state => ({
            ...state,
            isShown: false,

            username: initialState.input,
            password: initialState.input,
            repeatPassword: initialState.input,
            email: initialState.input,
            name: initialState.input,
            lastname: initialState.input
        }),

        [actions.enterUsername]: (state, {payload}) => ({
            ...state,
            username: {
                value: payload.username,
                isValid: true,
                errorMessage: ''
            }
        }),

        [actions.enterPassword]: (state, {payload}) => ({
            ...state,
            password: {
                value: payload.password,
                isValid: true,
                errorMessage: ''
            }
        }),

        [actions.enterRepeatPassword]: (state, {payload}) => ({
            ...state,
            repeatPassword: {
                value: payload.repeatPassword,
                isValid: true,
                errorMessage: ''
            }
        }),

        [actions.enterEmail]: (state, {payload}) => ({
            ...state,
            email: {
                value: payload.value,
                isValid: true,
                errorMessage: ''
            }
        }),

        [actions.enterName]: (state, {payload}) => ({
            ...state,
            name: {
                value: payload.value,
                isValid: true,
                errorMessage: ''
            }
        }),

        [actions.enterLastname]: (state, {payload}) => ({
            ...state,
            lastname: {
                value: payload.lastname,
                isValid: true,
                errorMessage: ''
            }
        }),
    },
    initialState
);

export default reducer