import React, { Component } from 'react'
import Appbar from './appbar';
import {Route} from 'react-router-dom'

import './css/appview.css';

class AppView extends Component {
    render() {
        return (
            <div className={'appview'}>
                <Appbar/>
                <Route exact path='' component{}/>
            </div>
        )
    }
}

export default AppView

