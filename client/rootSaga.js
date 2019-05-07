import { all } from 'redux-saga/effects'
import authorizationSaga from './authorization/saga'
import applicationSaga from './applicationSaga'

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