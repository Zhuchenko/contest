import {all, call, put, takeLatest} from 'redux-saga/effects'
import * as actions from './actions'
import {addSet, deleteSet, editSet, getSets} from '../../services/setOfProblemsApi'
import {toastr} from "react-redux-toastr";
import getTranslations from "../../utilities/getTranslations";

export default function* setOfUsersSaga() {
    yield all([
        yield takeLatest(actions.getSets, getSetsSaga),
        yield takeLatest(actions.addSet, addSetSaga),
        yield takeLatest(actions.editSet, editSetSaga),
        yield takeLatest(actions.deleteSet, deleteSetSaga),
    ])
}

function* getSetsSaga() {
    try {
        const sets = yield call(getSets);

        yield put(actions.getSetsSuccess(sets));
    } catch (error) {
        yield put(actions.getSetsFailure(error));
        toastr.error(getTranslations({text: 'error'}), error);
    }
}

function* addSetSaga(action) {
    try {
        const {name, problems} = action.payload;
        yield call(addSet, {name, problems});

        yield put(actions.getSets());
        yield put(actions.getSetsSuccess());
        toastr.success(getTranslations({text: 'success'}), getTranslations({text: 'set of problems create message'}));
    } catch (error) {
        yield put(actions.getSetsFailure(error));
        toastr.error(getTranslations({text: 'error'}), error);
    }
}

function* editSetSaga(action) {
    try {
        const {newState, id} = action.payload;
        yield call(editSet, id, newState);

        yield put(actions.getSets());
        yield put(actions.editSetSuccess());
        toastr.success(getTranslations({text: 'success'}), getTranslations({text: 'set of problems edit message'}));
    } catch (error) {
        yield put(actions.editSetFailure(error));
        toastr.error(getTranslations({text: 'error'}), error);
    }
}

function* deleteSetSaga(action) {
    try {
        const {id} = action.payload;
        yield call(deleteSet, id);

        yield put(actions.getSets());
        yield put(actions.deleteSetSuccess());
        toastr.success(getTranslations({text: 'success'}), getTranslations({text: 'set of problems delete message'}));
    } catch (error) {
        yield put(actions.deleteSetFailure(error));
        toastr.error(getTranslations({text: 'error'}), error);
    }
}