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
        [application.init]: () => initialState,

        [application.initSuccessAuthorized]: (state, {payload}) => ({
            authorized: true,
            isFetching: false,
            rights: payload.rights
        }),

        [application.initSuccessNotAuthorized]: () => initialState,

        [application.initFailure]: () => initialState,

        [authorization.signIn]: () => initialState,

        [authorization.signInSuccess]: (state, {payload}) => ({
            authorized: true,
            isFetching: false,
            rights: payload.rights
        }),

        [authorization.signInFailure]: () => ({
            authorized: false,
            isFetching: false,
            rights: null
        }),

        [authorization.signOutSuccess]: () => ({
            authorized: false,
            isFetching: false,
            rights: null
        })
    },
    initialState
);

export default reducer