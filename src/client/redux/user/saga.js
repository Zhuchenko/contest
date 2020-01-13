import {all, call, put, takeLatest} from 'redux-saga/effects'
import * as actions from './actions'
import {getUsers, addUser, editUser, editUnverifiedUser, deleteUser, deleteUnverifiedUser} from '../../services/userApi'
import {setError} from "../application/actions";
import {toastr} from "react-redux-toastr";
import getTranslations from "../../utilities/getTranslations";


export default function* userSaga() {
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
        yield put(setError({errorCode:error}));
        yield put(actions.getUsersFailure(error));
        toastr.error(getTranslations({text: 'error'}), error);
    }
}

function* addUserSaga(action) {
    try {
        const {name, lastName, role, authKey} = action.payload;
        yield call(addUser, {name, lastName, role, authKey});

        yield put(actions.getUsers());
        yield put(actions.addUserSuccess());
        toastr.success(getTranslations({text: 'success'}), getTranslations({text: 'user create message'}));
    } catch (error) {
        yield put(actions.addUserFailure(error));
        toastr.error(getTranslations({text: 'error'}), error);
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
        toastr.success(getTranslations({text: 'success'}), getTranslations({text: 'user edit message'}));
    } catch (error) {
        yield put(actions.editUserFailure(error));
        toastr.error(getTranslations({text: 'error'}), error);
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
        toastr.success(getTranslations({text: 'success'}), getTranslations({text: 'user delete message'}));
    } catch (error) {
        yield put(actions.deleteUserFailure(error));
        toastr.error(getTranslations({text: 'error'}), error);
    }
}