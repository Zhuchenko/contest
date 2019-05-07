import { combineReducers } from 'redux'
import application from './applicationReducer'
import authorization from './authorization/reducer'

export default combineReducers({
    application,
    authorization,
})