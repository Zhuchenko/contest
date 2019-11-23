import { combineReducers } from 'redux'
import {reducer as toastr} from 'react-redux-toastr'
import application from './application/reducer'
import authorization from './authorization/reducer'
import user from './user/reducer'
import groupOfUsers from './groupOfUsers/reducer'
import problem from './problem/reducer'
import setOfProblems from './setOfProblems/reducer'
import contest from './contest/reducer'

export default combineReducers({
    application,
    authorization,
    user,
    groupOfUsers,
    problem,
    setOfProblems,
    contest,
    toastr
})