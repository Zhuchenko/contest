import React from 'react'
import AppBar from './appbar';
import {Route} from 'react-router-dom'
import Problem from '../problem/problem'

import './css/appview.css';

const AppView = () => {
    return (
        <div className={'appview'}>
            <AppBar/>
            <Route path='/problems/:problemId' component={Problem}/>
        </div>
    )
};

export default AppView