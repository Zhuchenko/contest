import {all, call, put, takeLatest} from 'redux-saga/effects'
import * as actions from './actions'
import {addProblem, deleteProblem, editProblem, getProblems} from '../../services/problemApi'
import {toastr} from "react-redux-toastr";

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
        yield put(actions.getProblemsFailure(error));
        toastr.error('Ошибка', error);
    }
}

function* addProblemSaga(action) {
    try {
        const problem = action.payload;
        yield call(addProblem, problem);

        yield put(actions.getProblems());
        yield put(actions.addProblemSuccess());
        toastr.success('Успех', "Задача создана");
    } catch (error) {
        yield put(actions.addProblemFailure(error));
        toastr.error('Ошибка', error);
    }
}

function* editProblemSaga(action) {
    try {
        const {newState, id} = action.payload;
        yield call(editProblem, id, newState);

        yield put(actions.getProblems());
        yield put(actions.editProblemSuccess());
        toastr.success('Успех', "Задача изменена");
    } catch (error) {
        yield put(actions.editProblemFailure(error));
        toastr.error('Ошибка', error);
    }
}

function* deleteProblemSaga(action) {
    try {
        const {id} = action.payload;
        yield call(deleteProblem, id);

        yield put(actions.getProblems());
        yield put(actions.deleteProblemSuccess());
        toastr.success('Успех', "Задача удалена");
    } catch (error) {
        yield put(actions.deleteProblemFailure(error));
        toastr.error('Ошибка', error);
    }
}