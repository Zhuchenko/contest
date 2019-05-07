import { all, takeLatest, call, put } from 'redux-saga/effects'
import * as actions from './applicationActions'
import { getUsername } from './api/authorizationService'

export default  function* authorizationSaga() {
    yield all([
        watchInit()
    ])
}

function* watchInit() {
    yield takeLatest(actions.init, initSaga)
}

function* initSaga() {
    try {
        const user = yield call(getUsername);

        if(user) {
            yield put(actions.authorized({user}));
        }
        else{
            yield put(actions.notAuthorized())
        }
    }
    catch (error) {
        yield put(actions.initFailure({error}))
    }
}
