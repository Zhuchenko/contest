import { all, takeLatest, call, put } from 'redux-saga/es/effects'
import * as actions from './actions'
import { init } from '../../services/authorizationApi'
import {toastr} from "react-redux-toastr";

export default  function* applicationSaga() {
    yield all([
        yield takeLatest(actions.init, initSaga)
    ])
}

function* initSaga() {
    try {
        const user = yield call(init);

        if(user) {
            yield put(actions.initSuccessAuthorized(user));
        }
        else{
            yield put(actions.initSuccessNotAuthorized());
        }
    }
    catch (error) {
        yield put(actions.initFailure({error}));
    }
}
