import {handleActions} from 'redux-actions'
import * as actions from './actions'

const initialState = {
    isShown: false,
};

const initialValueOfInput = () => ({
    value: '',
    isValid: true,
    errorMessage: ''
});

const reducer = handleActions(
    {
        [actions.init]: state => ({
            ...state,
            isShown: initialState.isShown,

            username: initialValueOfInput(),
            password: initialValueOfInput(),
            repeatPassword: initialValueOfInput(),
            email: initialValueOfInput(),
            name: initialValueOfInput(),
            lastName: initialValueOfInput()
        }),

        [actions.signInSuccess]: state => ({
            ...state,
            isShown: false,

            username: initialValueOfInput(),
            password: initialValueOfInput(),
            repeatPassword: initialValueOfInput(),
            email: initialValueOfInput(),
            name: initialValueOfInput(),
            lastName: initialValueOfInput()
        }),

        [actions.signInFailureUsername]: (state, {payload}) => ({    //validation
            ...state,
            isShown: true,

            username: {
                value: '',
                isValid: payload.isValid,
                errorMessage: payload.errorMessage
            },

            password: initialValueOfInput(),
            repeatPassword: initialValueOfInput(),
            email: initialValueOfInput(),
            name: initialValueOfInput(),
            lastName: initialValueOfInput()
        }),

        [actions.signInFailurePassword]: (state, {payload}) => ({
            ...state,
            isShown: true,

            password: {
                value: '',
                isValid: payload.isValid,
                errorMessage: payload.errorMessage
            },

            repeatPassword: initialValueOfInput(),
            email: initialValueOfInput(),
            name: initialValueOfInput(),
            lastName: initialValueOfInput()
        }),

        [actions.signUpSuccess]: state => ({
            ...state,
            isShown: false,

            username: initialValueOfInput(),
            password: initialValueOfInput(),
            repeatPassword: initialValueOfInput(),
            email: initialValueOfInput(),
            name: initialValueOfInput(),
            lastName: initialValueOfInput()
        }),

        [actions.signUpFailureEmail]: (state, {payload}) => ({
            ...state,
            isShown: true,

            email: {
                value: '',
                isValid: payload.isValid,
                errorMessage: payload.errorMessage
            },
            password: initialValueOfInput(),
            repeatPassword: initialValueOfInput(),
        }),

        [actions.signUpFailureUsername]: (state, {payload}) => ({
            ...state,
            isShown: true,

            username: {
                value: '',
                isValid: payload.isValid,
                errorMessage: payload.errorMessage
            },
            password: initialValueOfInput(),
            repeatPassword: initialValueOfInput(),
        }),

        [actions.signUpFailureEmail]: (state, {payload}) => ({
            ...state,
            isShown: true,

            email: {
                value: '',
                isValid: payload.isValid,
                errorMessage: payload.errorMessage
            },
            password: initialValueOfInput(),
            repeatPassword: initialValueOfInput(),
        }),

        [actions.signOutSuccess]: state => ({
            ...state,
            isShown: false,

            username: initialValueOfInput(),
            password: initialValueOfInput(),
            repeatPassword: initialValueOfInput(),
            email: initialValueOfInput(),
            name: initialValueOfInput(),
            lastName: initialValueOfInput()
        }),

        [actions.signOutFailure]: state => ({
            ...state
        }),

        [actions.showForm]: state => ({
            ...state,
            isShown: true,

            username: initialValueOfInput(),
            password: initialValueOfInput(),
            repeatPassword: initialValueOfInput(),
            email: initialValueOfInput(),
            name: initialValueOfInput(),
            lastName: initialValueOfInput()
        }),

        [actions.hideForm]: state => ({
            ...state,
            isShown: false,

            username: initialValueOfInput(),
            password: initialValueOfInput(),
            repeatPassword: initialValueOfInput(),
            email: initialValueOfInput(),
            name: initialValueOfInput(),
            lastName: initialValueOfInput()
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
                value: state.username.value,
                isValid: false,
                errorMessage: payload.errorMessage
            }
        }),

        [actions.passwordIsNotValid]: (state, {payload}) => ({
            ...state,
            password: {
                value: '',
                isValid: false,
                errorMessage: payload.errorMessage
            },
            repeatPassword: {
                value: '',
                isValid: state.repeatPassword.isValid,
                errorMessage: state.repeatPassword.errorMessage
            }
        }),

        [actions.repeatPasswordIsNotValid]: (state, {payload}) => ({
            ...state,
            repeatPassword: {
                value: '',
                isValid: false,
                errorMessage: payload.errorMessage
            }
        }),

        [actions.emailIsNotValid]: (state, {payload}) => ({
            ...state,
            email: {
                value: state.email.value,
                isValid: false,
                errorMessage: payload.errorMessage
            }
        }),

        [actions.nameIsNotValid]: (state, {payload}) => ({
            ...state,
            name: {
                value: state.name.value,
                isValid: false,
                errorMessage: payload.errorMessage
            }
        }),

        [actions.lastNameIsNotValid]: (state, {payload}) => ({
            ...state,
            lastName: {
                value: state.lastName.value,
                isValid: false,
                errorMessage: payload.errorMessage
            }
        }),
    },
    initialState
);

export default reducer