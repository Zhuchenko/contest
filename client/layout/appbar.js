import React, { Component } from 'react'
import UserControls from '../authorization/components/userControls'

import './css/appbar.css';

class Appbar extends Component {
    render() {
        return (
            <div className={'appbar'}>
                <UserControls/>
            </div>
        )
    }
}

export default Appbar


