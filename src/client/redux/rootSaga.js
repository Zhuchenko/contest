import { all } from 'redux-saga/es/effects'
import authorizationSaga from './authorization/saga'
import applicationSaga from './application/saga'
import userSaga from './user/saga'
import groupOfUsersSaga from './groupOfUsers/saga'
import problemSaga from './problem/saga'
import setOfProblemsSaga from './setOfProblems/saga'

const creator = ({ history }) => {
    function* rootSaga() {
        yield all([
            authorizationSaga(),
            applicationSaga(),
            userSaga(),
            groupOfUsersSaga(),
            problemSaga(),
            setOfProblemsSaga()
        ])
    }

    return rootSaga()
};

export default creator