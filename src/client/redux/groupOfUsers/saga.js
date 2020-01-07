import {all, call, put, takeLatest} from 'redux-saga/effects'
import * as actions from './actions'
import {addGroup, deleteGroup, editGroup, getGroups} from '../../services/groupOfUsersApi'
import {toastr} from "react-redux-toastr";

export default function* groupOfUsersSaga() {
    yield all([
        yield takeLatest(actions.getGroups, getGroupsSaga),
        yield takeLatest(actions.addGroup, addGroupSaga),
        yield takeLatest(actions.editGroup, editGroupSaga),
        yield takeLatest(actions.deleteGroup, deleteGroupSaga),
    ])
}

function* getGroupsSaga() {
    try {
        const groups = yield call(getGroups);

        yield put(actions.getGroupsSuccess(groups));
    } catch (error) {
        yield put(actions.getGroupsFailure(error));
        toastr.error('Ошибка', error);
    }
}

function* addGroupSaga(action) {
    try {
        const {name, users} = action.payload;
        yield call(addGroup, {name, users});

        yield put(actions.getGroups());
        yield put(actions.getGroupsSuccess());
        toastr.success('Успех', "Группа пользователей создана");
    } catch (error) {
        yield put(actions.getGroupsFailure(error));
        toastr.error('Ошибка', error);
    }
}

function* editGroupSaga(action) {
    try {
        const {newState, id} = action.payload;
        yield call(editGroup, id, newState);

        yield put(actions.getGroups());
        yield put(actions.editGroupSuccess());
        toastr.success('Успех', "Группа пользователей изменена");
    } catch (error) {
        yield put(actions.editGroupFailure(error));
        toastr.error('Ошибка', error);
    }
}

function* deleteGroupSaga(action) {
    try {
        const {id} = action.payload;
        yield call(deleteGroup, id);

        yield put(actions.getGroups());
        yield put(actions.deleteGroupSuccess());
        toastr.success('Успех', "Группа пользователей удалена");
    } catch (error) {
        yield put(actions.deleteGroupFailure(error));
        toastr.error('Ошибка', error);
    }
}