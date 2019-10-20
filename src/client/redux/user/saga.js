import { all, takeLatest, call, put } from 'redux-saga/effects'
import * as actions from './actions'
import { getUsers, deleteUser } from '../../services/userApi'

export default  function* authorizationSaga() {
    yield all([
        watchGetUsers(),
        watchDeleteUser()
    ])
}

function* watchGetUsers() {
    yield takeLatest(actions.getUsers, getUsersSaga)
}

function* watchDeleteUser() {
    yield takeLatest(actions.deleteUser, deleteUserSaga)
}

function* getUsersSaga() {
    try {
        const users = yield call(getUsers);
        yield put(actions.getUsersSuccess(users));
    }
    catch (error) {
        yield put(actions.getUsersFailure(error))
    }
}

function* deleteUserSaga(action) {
    try {
        const {id} = action.payload;
        yield call(deleteUser, id);

        yield put(actions.getUsers());
        yield put(actions.deleteUserSuccess());
    }
    catch (error) {
        yield put(actions.deleteUserFailure(error))
    }
}