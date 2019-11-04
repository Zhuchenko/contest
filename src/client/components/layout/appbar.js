import React from 'react'
import UserControls from '../authorization/UserControls'

import './css/appbar.css';

const AppBar  = () => {
    return (
        <div className={'appbar'}>
            <UserControls/>
        </div>
    )
};

export default AppBar


