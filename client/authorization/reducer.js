import {handleActions} from 'redux-actions'
import * as actions from './actions'

const initialState = {
    isShown: false,

    username: '',
    password: '',
    repeatPassword: '',
    email: '',
    name: '',
    lastname: '',

    usernameIsValid: true,
    passwordIsValid: true,
    repeatPasswordIsValid: true,
    emailIsValid: true,
    nameIsValid: true,
    lastnameIsValid: true
};

const reducer = handleActions(
    {
        [actions.init]: state => ({
            ...state,
            isShown: initialState.isShown,

            username: initialState.username,
            password: initialState.password,
            repeatPassword: initialState.repeatPassword,
            email: initialState.email,
            name: initialState.name,
            lastname: initialState.lastname,

            usernameIsValid: initialState.usernameIsValid,
            passwordIsValid: initialState.passwordIsValid,
            repeatPasswordIsValid: initialState.repeatPasswordIsValid,
            emailIsValid: initialState.emailIsValid,
            nameIsValid: initialState.nameIsValid,
            lastnameIsValid: initialState.lastnameIsValid
        }),

        [actions.signinSuccess]: state => ({
            ...state,
            isShown: false,

            username: '',
            password: '',
            repeatPassword: '',
            email: '',
            name: '',
            lastname: '',

            usernameIsValid: true,
            passwordIsValid: true,
            repeatPasswordIsValid: true,
            emailIsValid: true,
            nameIsValid: true,
            lastnameIsValid: true
        }),

        [actions.signinFailure]: state => ({    //validation
            ...state,
            isShown: true,

            username: '',
            password: '',
            repeatPassword: '',
            email: '',
            name: '',
            lastname: '',

            usernameIsValid: true,
            passwordIsValid: true,
            repeatPasswordIsValid: true,
            emailIsValid: true,
            nameIsValid: true,
            lastnameIsValid: true
        }),

        [actions.signupSuccess]: state => ({
            ...state,
            isShown: false,

            username: '',
            password: '',
            repeatPassword: '',
            email: '',
            name: '',
            lastname: '',

            usernameIsValid: true,
            passwordIsValid: true,
            repeatPasswordIsValid: true,
            emailIsValid: true,
            nameIsValid: true,
            lastnameIsValid: true
        }),

        [actions.signupFailure]: state => ({    //validation
            ...state,
            isShown: true,

            username: '',
            password: '',
            repeatPassword: '',
            email: '',
            name: '',
            lastname: '',

            usernameIsValid: true,
            passwordIsValid: true,
            repeatPasswordIsValid: true,
            emailIsValid: true,
            nameIsValid: true,
            lastnameIsValid: true
        }),

        [actions.signoutSuccess]: state => ({
            ...state,
            isShown: false,

            username: '',
            password: '',
            repeatPassword: '',
            email: '',
            name: '',
            lastname: '',

            usernameIsValid: true,
            passwordIsValid: true,
            repeatPasswordIsValid: true,
            emailIsValid: true,
            nameIsValid: true,
            lastnameIsValid: true
        }),

        [actions.signoutFailure]: state => ({
            ...state,
            isShown: false,

            username: '',
            password: '',
            repeatPassword: '',
            email: '',
            name: '',
            lastname: '',

            usernameIsValid: true,
            passwordIsValid: true,
            repeatPasswordIsValid: true,
            emailIsValid: true,
            nameIsValid: true,
            lastnameIsValid: true
        }),

        [actions.showForm]: state => ({
            ...state,
            isShown: true,

            username: '',
            password: '',
            repeatPassword: '',
            email: '',
            name: '',
            lastname: '',

            usernameIsValid: true,
            passwordIsValid: true,
            repeatPasswordIsValid: true,
            emailIsValid: true,
            nameIsValid: true,
            lastnameIsValid: true
        }),

        [actions.hideForm]: state => ({
            ...state,
            isShown: false,

            username: '',
            password: '',
            repeatPassword: '',
            email: '',
            name: '',
            lastname: '',

            usernameIsValid: true,
            passwordIsValid: true,
            repeatPasswordIsValid: true,
            emailIsValid: true,
            nameIsValid: true,
            lastnameIsValid: true
        }),

        [actions.enterUsername]: (state, {payload}) => ({
            ...state,
            username: payload.username,
            usernameIsValid: true,
        }),

        [actions.enterPassword]: (state, {payload}) => ({
            ...state,
            password: payload.password,
            passwordIsValid: true
        }),

        [actions.enterRepeatPassword]: (state, {payload}) => ({
            ...state,
            username: payload.repeatPassword,
            repeatPasswordIsValid: true
        }),

        [actions.enterEmail]: (state, {payload}) => ({
            ...state,
            username: payload.email,
            emailIsValid: true
        }),

        [actions.enterName]: (state, {payload}) => ({
            ...state,
            username: payload.name,
            nameIsValid: true
        }),

        [actions.enterLastname]: (state, {payload}) => ({
            ...state,
            username: payload.lastname,
            lastnameIsValid: true
        }),

    },
    initialState
);

export default reducer