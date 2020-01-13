import {all, call, put, takeLatest} from 'redux-saga/es/effects'
import * as actions from './actions'
import {toastr} from 'react-redux-toastr'
import {signIn, signOut, signUp} from '../../services/authorizationApi'
import getTranslations from "../../utilities/getTranslations";

export default function* authorizationSaga() {
    yield all([
        yield takeLatest(actions.signIn, signInSaga),
        yield takeLatest(actions.signUp, signUpSaga),
        yield takeLatest(actions.signOut, signOutSaga)
    ])
}

function* signInSaga(action) {
    const {email, password} = action.payload;
    const {user, errorMessage}  = yield call(signIn, email, password);

    if (user) {
        yield put(actions.signInSuccess(user));
    } else {
        yield put(actions.signInFailure({errorMessage}));
        toastr.error(getTranslations({text: 'error'}), errorMessage);
    }
}

function* signUpSaga(action) {
    const {email, password, name, lastName, authKey} = action.payload;
    const {errorMessage} = yield call(signUp, {email, password, name, lastName, authKey});

    if (!errorMessage) {
        yield put(actions.signUpSuccess());
    } else {
        yield put(actions.signUpFailure({errorMessage}));
        toastr.error(getTranslations({text: 'error'}), errorMessage);
    }
}

function* signOutSaga() {
    yield call(signOut);
    yield put(actions.signOutSuccess())
}