import {all, call, put, takeLatest} from 'redux-saga/effects'
import * as actions from './actions'
import {addProblem, deleteProblem, editProblem, getProblems} from '../../services/problemApi'

export default function* problemSaga() {
    yield all([
        yield takeLatest(actions.getProblems, getProblemsSaga),
        yield takeLatest(actions.addProblem, addProblemSaga),
        yield takeLatest(actions.editProblem, editProblemSaga),
        yield takeLatest(actions.deleteProblem, deleteProblemSaga),
    ])
}

function* getProblemsSaga() {
    try {
        const problems = yield call(getProblems);
        yield put(actions.getProblemsSuccess(problems));
    } catch (error) {
        yield put(actions.getProblemsFailure(error))
    }
}

function* addProblemSaga(action) {
    try {
        const problem = action.payload;
        yield call(addProblem, problem);

        yield put(actions.getProblems());
        yield put(actions.getProblemsSuccess());
    } catch (error) {
        yield put(actions.getProblemsFailure(error))
    }
}

function* editProblemSaga(action) {
    try {
        const {newState, id} = action.payload;
        yield call(editProblem, id, newState);

        yield put(actions.getProblems());
        yield put(actions.editProblemSuccess());
    } catch (error) {
        yield put(actions.editProblemFailure(error))
    }
}

function* deleteProblemSaga(action) {
    try {
        const {id} = action.payload;
        yield call(deleteProblem, id);

        yield put(actions.getProblems());
        yield put(actions.deleteProblemSuccess());
    } catch (error) {
        yield put(actions.deleteProblemFailure(error))
    }
}