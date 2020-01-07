import {all, call, put, takeLatest} from 'redux-saga/effects'
import * as actions from './actions'
import {addContest, deleteContest, editContest, getContests} from '../../services/contestApi'
import {toastr} from "react-redux-toastr";

export default function* groupOfUsersSaga() {
    yield all([
        yield takeLatest(actions.getContests, getContestsSaga),
        yield takeLatest(actions.addContest, addContestSaga),
        yield takeLatest(actions.editContest, editContestSaga),
        yield takeLatest(actions.deleteContest, deleteContestSaga),
    ])
}

function* getContestsSaga() {
    try {
        const contests = yield call(getContests);

        yield put(actions.getContestsSuccess(contests));
    } catch (error) {
        yield put(actions.getContestsFailure(error));
        toastr.error('Ошибка', error);
    }
}

function* addContestSaga(action) {
    try {
        const contest = action.payload;
        yield call(addContest, contest);

        yield put(actions.getContests());
        yield put(actions.getContestsSuccess());
        toastr.success('Успех', "Соревнование создано");
    } catch (error) {
        yield put(actions.getContestsFailure(error));
        toastr.error('Ошибка', error);
    }
}

function* editContestSaga(action) {
    try {
        const {newState, id} = action.payload;
        yield call(editContest, id, newState);

        yield put(actions.getContests());
        yield put(actions.editContestSuccess());
        toastr.success('Успех', "Соревнование изменено");
    } catch (error) {
        yield put(actions.editContestFailure(error));
        toastr.error('Ошибка', error);
    }
}

function* deleteContestSaga(action) {
    try {
        const {id} = action.payload;
        yield call(deleteContest, id);

        yield put(actions.getContests());
        yield put(actions.deleteContestSuccess());
        toastr.success('Успех', "Соревнование удалено");
    } catch (error) {
        yield put(actions.deleteContestFailure(error));
        toastr.error('Ошибка', error);
    }
}