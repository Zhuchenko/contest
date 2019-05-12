import React, { Component } from 'react'
import Appbar from './appbar';
import {Route} from 'react-router-dom'
import Problem from '../components/problem'

import './css/appview.css';

class AppView extends Component {
    render() {
        return (
            <div className={'appview'}>
                <Appbar/>
                <Route path='/problems/:problemId' component={Problem}/>
            </div>
        )
    }
}

export default AppView