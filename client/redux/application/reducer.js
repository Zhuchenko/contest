import { handleActions } from 'redux-actions'
import * as application from './actions'
import * as authorization from '../authorization/actions'

const initialState = {
    authorized: false,
    isFetching: true,
    rights: null
};

const reducer = handleActions(
    {
        [application.init]: (state) => ({
            ...state,
            authorized: initialState.authorized,
            isFetching: initialState.isFetching,
            rights: initialState.rights
        }),

        [application.initSuccessAuthorized]: (state, {payload}) => ({
            ...state,
            authorized: true,
            isFetching: false,
            rights: payload.rights
        }),

        [application.initSuccessNotAuthorized]: (state) => ({
            ...state,
            authorized: false,
            isFetching: false,
        }),

        [application.initFailure]: (state) => ({
            ...state,
            authorized: false,
            isFetching: false,
        }),

        [authorization.signIn]: (state) => ({
            ...state,
            isFetching: true
        }),

        [authorization.signInSuccess]: (state, {payload}) => ({
            ...state,
            authorized: true,
            isFetching: false,
            rights: payload.rights
        }),

        [authorization.signInFailurePassword]: (state) => ({
            ...state,
            isFetching: false,
            rights: null
        }),

        [authorization.signInFailureEmail]: (state) => ({
            ...state,
            isFetching: false,
            rights: null
        }),

        [authorization.signUp]: (state) => ({
            ...state,
            isFetching: true
        }),

        [authorization.signUpSuccess]: (state, {payload}) => ({
            ...state,
            authorized: true,
            isFetching: false,
            rights: payload.rights
        }),

        [authorization.signUpFailureEmail]: (state) => ({
            ...state,
            isFetching: false,
            rights: null
        }),

        [authorization.signOutSuccess]: (state) => ({
            ...state,
            authorized: false,
            isFetching: false,
            rights: null
        })
    },
    initialState
)

export default reducer