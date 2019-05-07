import { handleActions } from 'redux-actions'
import * as application from './applicationActions'
import * as authorization from './authorization/actions'

const initialState = {
    authorized: false,
    username: '',
}

const reducer = handleActions(
    {
        [application.init]: (state) => ({
            ...state,
            authorized: initialState.authorized,
            username: initialState.username,
        }),

        [application.authorized]: (state, {payload}) => ({
            ...state,
            authorized: true,
            username: payload.username,
        }),

        [application.notAuthorized]: (state) => ({
            ...state,
            authorized: false,
            username: '',
        }),

        [application.initFailure]: (state) => ({
            ...state,
            authorized: false,
            username: '',
        }),

        [authorization.signinSuccess]: (state, {payload}) => ({
            ...state,
            authorized: true,
            username: payload.username,
        }),

        [authorization.signupSuccess]: (state, {payload}) => ({
            ...state,
            authorized: true,
            username: payload.username,
        }),

        [authorization.signoutSuccess]: (state) => ({
            ...state,
            authorized: false,
            username: '',
        })
    },
    initialState
)

export default reducer