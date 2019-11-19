import React from 'react'
import AppBar from './appbar';
import {Switch} from 'react-router-dom'
import PrivateRoute from '../common/PrivateRoute'
import NavigationPanel from '../Navigation/NavigationPanel'
import Problem from '../problem/Problem'
import ListOfProblems from '../problem/ListOfProblems'
import User from '../user/User'
import ListOfUsers from '../user/ListOfUsers'
import Group from '../groupOfUsers/Group'
import ListOfGroups from '../groupOfUsers/ListOfGroups'
import Set from '../setOfProblems/Set'
import ListOfSets from '../setOfProblems/ListOfSets'

import './css/appview.css';
import {connect} from "react-redux";

const AppView = () => {
    return (
        <div className={'appview'}>
            <AppBar/>
            <div className={'content'}>
                <Switch>
                    <PrivateRoute exact path='/problems/' component={ListOfProblems}/>
                    <PrivateRoute exact path='/problems/:problemId' component={Problem}/>
                    <PrivateRoute exact path='/sets/' component={ListOfSets}/>
                    <PrivateRoute exact path='/sets/:setId' component={Set}/>
                    <PrivateRoute exact path='/users/' component={ListOfUsers}/>
                    <PrivateRoute exact path='/users/:userId' component={User}/>
                    <PrivateRoute exact path='/groups/' component={ListOfGroups}/>
                    <PrivateRoute exact path='/groups/:groupId' component={Group}/>
                </Switch>
            </div>
        </div>
    )
};

export default AppView;