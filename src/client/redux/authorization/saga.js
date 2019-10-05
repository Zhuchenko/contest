import { all, takeLatest, call, put } from 'redux-saga/es/effects'
import * as actions from './actions'
import { signIn, signUp, signOut } from '../../services/authorizationApi'

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
    const {email, password} = action.payload;
    const {user, error} = yield call(signIn, email, password);

    if (user) {
        yield put(actions.signInSuccess(user));
    } else{
        if(error.email){
            yield put(actions.signInFailureEmail({...error.email, isValid:false}));
        }
        if(error.password){
            yield put(actions.signInFailurePassword({...error.password, isValid:false}));
        }
    }
}

function* signUpSaga(action) {
    const {email, password, name, lastName} = action.payload;
    const {user, error} = yield call(signUp, email, password, name, lastName);

    if (user) {
        yield put(actions.signUpSuccess(user));
    } else {
        if (error.email) {
            yield put(actions.signUpFailureEmail({...error.email, isValid: false}));
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