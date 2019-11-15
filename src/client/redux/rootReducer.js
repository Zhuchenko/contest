import { combineReducers } from 'redux'
import application from './application/reducer'
import authorization from './authorization/reducer'
import user from './user/reducer'
import groupOfUsers from './groupOfUsers/reducer'
import problem from './problem/reducer'
import setOfProblems from './setOfProblems/reducer'

export default combineReducers({
    application,
    authorization,
    user,
    groupOfUsers,
    problem,
    setOfProblems
})