import {all, call, put, takeLatest} from 'redux-saga/es/effects'
import * as actions from './actions'
import {signIn, signOut, signUp} from '../../services/authorizationApi'

export default function* authorizationSaga() {
    yield all([
        watchSignIn(),
        watchSignUp(),
        watchSignOut()
    ])
}

function* watchSignIn() {
    yield takeLatest(actions.signIn, signInSaga)
}

function* watchSignUp() {
    yield takeLatest(actions.signUp, signUpSaga)
}

function* watchSignOut() {
    yield takeLatest(actions.signOut, signOutSaga)
}

function* signInSaga(action) {
    const {email, password} = action.payload;
    const {user, error}  = yield call(signIn, email, password);

    if (user) {
        yield put(actions.signInSuccess(user));
    } else {
        yield put(actions.signInFailure({errorMessage: error.errorMessage}));
    }
}

function* signUpSaga(action) {
    const {email, password, name, lastName, authKey} = action.payload;
    const {error} = yield call(signUp, {email, password, name, lastName, authKey});

    if (!error) {
        yield put(actions.signUpSuccess());
    } else {
        yield put(actions.signUpFailure({errorMessage: error.errorMessage}));
    }
}

function* signOutSaga() {
    yield call(signOut);
    yield put(actions.signOutSuccess())
}