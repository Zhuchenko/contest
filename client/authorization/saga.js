import { all, takeLatest, call, put } from 'redux-saga/effects'
import * as actions from './actions'
import { signin, signup, signout } from '../api/authorizationService'

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
        const user = yield call(signin, username, password);

        yield put(actions.signinSuccess({ user }));
    }
    catch (error) {
        yield put(actions.signinFailure({error}))
    }
}

function* signupSaga(action) {
    try {
        const { username, password, email, name, lastname } = action.payload;
        const user = yield call(signup, username, password, email, name, lastname);

        yield put(actions.signupSuccess({user}));
    }
    catch (error) {
        yield put(actions.signinFailure({error}))
    }
}

function* signoutSaga() {
    try {
        yield call(signout);
        yield put(actions.signoutSuccess())
    }
    catch (error) {
        yield put(actions.signoutFailure({error}))
    }
}