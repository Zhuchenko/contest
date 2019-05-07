import { all } from 'redux-saga/effects'
import authorizationSaga from './authorization/saga'

const creator = ({ history }) => {
    function* rootSaga() {
        yield all([
            authorizationSaga(),
        ])
    }

    return rootSaga()
}

export default creator