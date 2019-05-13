import { combineReducers } from 'redux'
import application from './application/reducer'
import authorization from './authorization/reducer'

export default combineReducers({
    application,
    authorization,
})