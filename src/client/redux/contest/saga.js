import {all, call, put, takeLatest} from 'redux-saga/effects'
import * as actions from './actions'
import {addContest, deleteContest, editContest, getContests} from '../../services/contestApi'

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
        yield put(actions.getContestsFailure(error))
    }
}

function* addContestSaga(action) {
    try {
        const {name, groups, sets, startingDate, endingDate} = action.payload;
        yield call(addContest, {name, groups, sets, startingDate, endingDate});

        yield put(actions.getContests());
        yield put(actions.getContestsSuccess());
    } catch (error) {
        yield put(actions.getContestsFailure(error))
    }
}

function* editContestSaga(action) {
    try {
        const {newState, id} = action.payload;
        yield call(editContest, id, newState);

        yield put(actions.getContests());
        yield put(actions.editContestSuccess());
    } catch (error) {
        yield put(actions.editContestFailure(error))
    }
}

function* deleteContestSaga(action) {
    try {
        const {id} = action.payload;
        yield call(deleteContest, id);

        yield put(actions.getContests());
        yield put(actions.deleteContestSuccess());
    } catch (error) {
        yield put(actions.deleteContestFailure(error))
    }
}