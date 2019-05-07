import { all, takeLatest, call, put } from 'redux-saga/effects'
import * as actions from './actions'
import { signin, signup } from '../api/authorizationService'

export default  function* authorizationSaga() {
    yield all([
        watchSignin(),
        watchSignup(),
        watchSignout()
    ])
}

function* watchSignin() {
    yield takeLatest(actions.signin, signinSaga)
}

function* watchSignup() {
    yield takeLatest(actions.signup, signupSaga)
}

function* watchSignout() {
    yield takeLatest(actions.signout, signoutSaga)
}

function* signinSaga(action) {
    try {
        const { username, password } = action.payload;
        const { user } = yield call(signin, username, password);

        setStorage(user);

        yield put(actions.signinSuccess({ user }));
    }
    catch (error) {
        yield put(actions.signinFailure({error}))
    }
}

function* signupSaga(action) {
    try {
        const { username, password } = action.payload;
        const { user } = yield call(signup, username, password);

        setStorage(user);

        yield put(actions.signupSuccess({user}));
    }
    catch (error) {
        yield put(actions.signinFailure({error}))
    }
}

function* signoutSaga() {
    try {
        sessionStorage.clear();
        yield put(actions.signoutSuccess())
    }
    catch (error) {
        yield put(actions.signoutFailure({error}))
    }
}

function setStorage(user) {
    sessionStorage.setItem("id", user._id);
    sessionStorage.setItem("username", user.username);
    sessionStorage.setItem("token", user.token);
}