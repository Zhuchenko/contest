import {all, call, put, takeLatest} from 'redux-saga/effects'
import * as actions from './actions'
import {addProblem, deleteProblem, editProblem, getProblems} from '../../services/problemApi'
import {toastr} from "react-redux-toastr";
import getTranslations from "../../utilities/getTranslations";

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
        toastr.error(getTranslations({text: 'error'}), error);
    }
}

function* addProblemSaga(action) {
    const problem = action.payload;
    const {error} = yield call(addProblem, problem);

    if (!error) {
        yield put(actions.getProblems());
        yield put(actions.addProblemSuccess());
        toastr.success(getTranslations({text: 'success'}), getTranslations({text: 'problem create message'}));
    } else {
        yield put(actions.addProblemFailure(error));
        toastr.error(getTranslations({text: 'error'}), error);
    }
}

function* editProblemSaga(action) {
    try {
        const {newState, id} = action.payload;
        yield call(editProblem, id, newState);

        yield put(actions.getProblems());
        yield put(actions.editProblemSuccess());
        toastr.success(getTranslations({text: 'success'}), getTranslations({text: 'problem edit message'}));
    } catch (error) {
        yield put(actions.editProblemFailure(error));
        toastr.error(getTranslations({text: 'error'}), error);
    }
}

function* deleteProblemSaga(action) {
    try {
        const {id} = action.payload;
        yield call(deleteProblem, id);

        yield put(actions.getProblems());
        yield put(actions.deleteProblemSuccess());
        toastr.success(getTranslations({text: 'success'}), getTranslations({text: 'problem delete message'}));
    } catch (error) {
        yield put(actions.deleteProblemFailure(error));
        toastr.error(getTranslations({text: 'error'}), error);
    }
}