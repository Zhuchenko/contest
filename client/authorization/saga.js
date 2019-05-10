import { all, takeLatest, call, put } from 'redux-saga/effects'
import * as actions from './actions'
import { signIn, signUp, signOut } from '../api/authorizationService'

export default  function* authorizationSaga() {
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
    const {username, password} = action.payload;
    const {user, error} = yield call(signIn, username, password);

    if (user) {
        yield put(actions.signInSuccess(user));
    } else{
        if(error.username){
            yield put(actions.signInFailureUsername({...error.username, isValid:false}));
        }
        if(error.password){
            yield put(actions.signInFailurePassword({...error.password, isValid:false}));
        }
    }
}

function* signUpSaga(action) {
    const {username, password, email, name, lastName} = action.payload;
    const {user, error} = yield call(signUp, username, password, email, name, lastName);

    if (user) {
        yield put(actions.signUpSuccess(user));
    } else {
        if (error.email) {
            yield put(actions.signUpFailureEmail({...error.email, isValid: false}));
        }
        if (error.username) {
            yield put(actions.signUpFailureUsername({...error.username, isValid: false}));
        }
    }
}

function* signOutSaga() {
    try {
        yield call(signOut);
        yield put(actions.signOutSuccess())
    }
    catch (error) {
        yield put(actions.signOutFailure(error))
    }
}