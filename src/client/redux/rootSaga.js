import { all } from 'redux-saga/es/effects'
import authorizationSaga from './authorization/saga'
import applicationSaga from './application/saga'
import userSaga from './user/saga'

const creator = ({ history }) => {
    function* rootSaga() {
        yield all([
            authorizationSaga(),
            applicationSaga(),
            userSaga()
        ])
    }

    return rootSaga()
}

export default creator