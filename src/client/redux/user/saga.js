import {all, call, put, takeLatest} from 'redux-saga/effects'
import * as actions from './actions'
import {getUsers, addUser, editUser, editUnverifiedUser, deleteUser, deleteUnverifiedUser} from '../../services/userApi'
import {forbid} from "../application/actions";

const FORBIDDEN = 403;

export default function* authorizationSaga() {
    yield all([
        yield takeLatest(actions.getUsers, getUsersSaga),
        yield takeLatest(actions.addUser, addUserSaga),
        yield takeLatest(actions.editUser, editUserSaga),
        yield takeLatest(actions.deleteUser, deleteUserSaga),
    ])
}

function* getUsersSaga() {
    try {
        const users = yield call(getUsers);
        yield put(actions.getUsersSuccess(users));
    } catch (error) {
        if (error === FORBIDDEN) {
            yield put(forbid())
        }
        yield put(actions.getUsersFailure(error))
    }
}

function* addUserSaga(action) {
    try {
        const {name, lastName, role, authKey} = action.payload;
        yield call(addUser, {name, lastName, role, authKey});

        yield put(actions.getUsers());
        yield put(actions.addUserSuccess());
    } catch (error) {
        yield put(actions.addUserFailure(error))
    }
}

function* editUserSaga(action) {
    try {
        const {newState, id, unverified} = action.payload;
        if (unverified)
            yield call(editUnverifiedUser, id, newState);
        else
            yield call(editUser, id, newState);

        yield put(actions.getUsers());
        yield put(actions.editUserSuccess());
    } catch (error) {
        yield put(actions.editUserFailure(error))
    }
}

function* deleteUserSaga(action) {
    try {
        const {id, unverified} = action.payload;
        if (unverified)
            yield call(deleteUnverifiedUser, id);
        else
            yield call(deleteUser, id);

        yield put(actions.getUsers());
        yield put(actions.deleteUserSuccess());
    } catch (error) {
        yield put(actions.deleteUserFailure(error))
    }
}