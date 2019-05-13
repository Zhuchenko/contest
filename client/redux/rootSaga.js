import { all } from 'redux-saga/es/effects'
import authorizationSaga from './authorization/saga'
import applicationSaga from './application/saga'

const creator = ({ history }) => {
    function* rootSaga() {
        yield all([
            authorizationSaga(),
            applicationSaga()
        ])
    }

    return rootSaga()
}

export default creator