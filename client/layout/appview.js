import React, { Component } from 'react'
import Appbar from './appbar';

import './css/appview.css';

class AppView extends Component {
    render() {
        return (
            <div className={'appview'}>
                <Appbar/>
            </div>
        )
    }
}

export default AppView

