import React from 'react'
import AppBar from './appbar';
import {Switch} from 'react-router-dom'
import PrivateRoute from '../common/PrivateRoute'
import Problem from '../problem/Problem'
import User from '../user/User'
import ListOfUsers from '../user/ListOfUsers'

import './css/appview.css';

const AppView = () => {
    return (
        <div className={'appview'}>
            <AppBar/>
            <Switch>
                <PrivateRoute exact path='/problems/:problemId' component={Problem}/>
                <PrivateRoute exact path='/users/' component={ListOfUsers}/>
                <PrivateRoute exact path='/users/:userId' component={User}/>
            </Switch>
        </div>
    )
};

export default AppView