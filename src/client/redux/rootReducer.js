import { combineReducers } from 'redux'
import application from './application/reducer'
import authorization from './authorization/reducer'
import user from './user/reducer'

export default combineReducers({
    application,
    authorization,
    user
})