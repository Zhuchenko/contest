import React from 'react'
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import './css/panel.css'

const NavigationPanel = ({isAuthorized, canAddUser, canAddProblems, canAddSet}) => {
    return (isAuthorized ? (<div>
            {canAddProblems ? <Link className={'panel'} to={'/problems/'}>{'Problems'}</Link> : null}
            {canAddSet ? <Link className={'panel'} to={'/sets/'}>{'Sets'}</Link> : null}
            <Link className={'panel'} to={'/groups/'}>{'Groups'}</Link>
            <Link className={'panel'} to={'/contests/'}>{'Contests'}</Link>
            {canAddUser ? <Link className={'panel'} to={'/users/'}>{'Users'}</Link> : null}
        </div>) : null

    )
};

const mapStateToProps = (state) => ({
    isAuthorized: state.application.authorized,
    canAddUser: state.application.authorized ? state.application.rights.user.edit : null,
    canAddProblems:  state.application.authorized ? state.application.rights.problem.add : null,
    canAddSet:  state.application.authorized ? state.application.rights.setOfProblems.add : null,
});

export default connect(mapStateToProps)(NavigationPanel);