import React from 'react'
import UserControls from '../authorization/UserControls'

import './css/appbar.css';
import NavigationPanel from "../Navigation/NavigationPanel";
import {connect} from "react-redux";

const AppBar  = (props) => {
    return (
        <div className={'appbar'}>
            {props.isAuthorized ? <NavigationPanel/> : null}
            <UserControls/>
        </div>
    )
};

const mapStateToProps = (state) => ({
    isAuthorized: state.application.authorized,
});

export default connect(mapStateToProps)(AppBar);

