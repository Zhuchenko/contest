import React from 'react'
import AppBar from './appbar';
import {Switch} from 'react-router-dom'
import PrivateRoute from '../common/PrivateRoute'
import Problem from '../problem/Problem'
import User from '../user/User'
import ListOfUsers from '../user/ListOfUsers'
import Group from '../groupOfUsers/Group'
import ListOfGroups from '../groupOfUsers/ListOfGroups'

import './css/appview.css';

const AppView = () => {
    return (
        <div className={'appview'}>
            <AppBar/>
            <div className={'content'}>
                <Switch>
                    <PrivateRoute exact path='/problems/:problemId' component={Problem}/>
                    <PrivateRoute exact path='/users/' component={ListOfUsers}/>
                    <PrivateRoute exact path='/users/:userId' component={User}/>
                    <PrivateRoute exact path='/groups/' component={ListOfGroups}/>
                    <PrivateRoute exact path='/groups/:groupId' component={Group}/>
                </Switch>
            </div>
        </div>
    )
};

export default AppView