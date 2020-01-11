import React from 'react'
import UserControls from '../authorization/UserControls'
import NavigationPanel from "../Navigation/NavigationPanel";
import ReduxToastr from 'react-redux-toastr'

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import './css/appbar.css';

const AppBar = () => {
    return (
        <div className={'appbar'}>
            <NavigationPanel/>
            <UserControls/>
            <ReduxToastr
                timeOut={5000}
                newestOnTop={false}
                // preventDuplicates
                position="bottom-right"
                getState={(state) => state.toastr}
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                closeOnToastrClick/>
        </div>
    )
};

export default AppBar

