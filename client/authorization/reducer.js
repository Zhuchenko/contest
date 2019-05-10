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
            lastName: initialState.input
        }),

        [actions.signInSuccess]: state => ({
            ...state,
            isShown: false,

            username: initialState.input,
            password: initialState.input,
            repeatPassword: initialState.input,
            email: initialState.input,
            name: initialState.input,
            lastName: initialState.input
        }),

        [actions.signInFailureUsername]: (state, {payload}) => ({    //validation
            ...state,
            isShown: true,

            username: {
                value: '',
                isValid: payload.isValid,
                errorMessage: payload.errorMessage
            },

            password: initialState.input,
            repeatPassword: initialState.input,
            email: initialState.input,
            name: initialState.input,
            lastName: initialState.input
        }),

        [actions.signInFailurePassword]: (state, {payload}) => ({
            ...state,
            isShown: true,

            password: {
                value: '',
                isValid: payload.isValid,
                errorMessage: payload.errorMessage
            },

            repeatPassword: initialState.input,
            email: initialState.input,
            name: initialState.input,
            lastName: initialState.input
        }),

        [actions.signUpSuccess]: state => ({
            ...state,
            isShown: false,

            username: initialState.input,
            password: initialState.input,
            repeatPassword: initialState.input,
            email: initialState.input,
            name: initialState.input,
            lastName: initialState.input
        }),

        [actions.signUpFailureEmail]: (state, {payload}) => ({
            ...state,
            isShown: true,

            email: {
                value: '',
                isValid: payload.isValid,
                errorMessage: payload.errorMessage
            },
            password: initialState.input,
            repeatPassword: initialState.input,
        }),

        [actions.signUpFailureUsername]: (state, {payload}) => ({
            ...state,
            isShown: true,

            username: {
                value: '',
                isValid: payload.isValid,
                errorMessage: payload.errorMessage
            },
            password: initialState.input,
            repeatPassword: initialState.input,
        }),

        [actions.signUpFailureEmail]: (state, {payload}) => ({
            ...state,
            isShown: true,

            email: {
                value: '',
                isValid: payload.isValid,
                errorMessage: payload.errorMessage
            },
            password: initialState.input,
            repeatPassword: initialState.input,
        }),

        [actions.signOutSuccess]: state => ({
            ...state,
            isShown: false,

            username: initialState.input,
            password: initialState.input,
            repeatPassword: initialState.input,
            email: initialState.input,
            name: initialState.input,
            lastName: initialState.input
        }),

        [actions.signOutFailure]: state => ({
            ...state,
            isShown: false,

            username: initialState.input,
            password: initialState.input,
            repeatPassword: initialState.input,
            email: initialState.input,
            name: initialState.input,
            lastName: initialState.input
        }),

        [actions.showForm]: state => ({
            ...state,
            isShown: true,

            username: initialState.input,
            password: initialState.input,
            repeatPassword: initialState.input,
            email: initialState.input,
            name: initialState.input,
            lastName: initialState.input
        }),

        [actions.hideForm]: state => ({
            ...state,
            isShown: false,

            username: initialState.input,
            password: initialState.input,
            repeatPassword: initialState.input,
            email: initialState.input,
            name: initialState.input,
            lastName: initialState.input
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
                value: payload.email,
                isValid: true,
                errorMessage: ''
            }
        }),

        [actions.enterName]: (state, {payload}) => ({
            ...state,
            name: {
                value: payload.name,
                isValid: true,
                errorMessage: ''
            }
        }),

        [actions.enterLastName]: (state, {payload}) => ({
            ...state,
            lastName: {
                value: payload.lastName,
                isValid: true,
                errorMessage: ''
            }
        }),

        [actions.usernameIsNotValid]: (state, {payload}) => ({
            ...state,
            username: {
                value: payload.value,
                isValid: false,
                errorMessage: payload.errorMessage
            }
        }),

        [actions.passwordIsNotValid]: (state, {payload}) => ({
            ...state,
            password: {
                value: payload.value,
                isValid: false,
                errorMessage: payload.errorMessage
            }
        }),

        [actions.repeatPasswordIsNotValid]: (state, {payload}) => ({
            ...state,
            repeatPassword: {
                value: payload.value,
                isValid: false,
                errorMessage: payload.errorMessage
            }
        }),

        [actions.emailIsNotValid]: (state, {payload}) => ({
            ...state,
            email: {
                value: payload.value,
                isValid: false,
                errorMessage: payload.errorMessage
            }
        }),

        [actions.nameIsNotValid]: (state, {payload}) => ({
            ...state,
            name: {
                value: payload.value,
                isValid: false,
                errorMessage: payload.errorMessage
            }
        }),

        [actions.lastNameIsNotValid]: (state, {payload}) => ({
            ...state,
            lastName: {
                value: payload.value,
                isValid: false,
                errorMessage: payload.errorMessage
            }
        }),
    },
    initialState
);

export default reducer