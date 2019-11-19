import React from 'react'
import {Link} from "react-router-dom";

import './css/panel.css'
import {connect} from "react-redux";

const NavigationPanel = ({isAuthorized, canAddUser, canAddProblems, canAddSet}) => {
    return (
        <>{
            isAuthorized ? (<div>
                {canAddProblems ? <Link className={'panel'} to={'/problems/'}>{'Problems'}</Link> : null}
                {canAddSet ? <Link className={'panel'} to={'/sets/'}>{'Sets'}</Link> : null}
                <Link className={'panel'} to={'/groups/'}>{'Groups'}</Link>
                {canAddUser ? <Link className={'panel'} to={'/users/'}>{'Users'}</Link> : null}
            </div>) : null
        }</>
    )
};

const mapStateToProps = (state) => ({
    isAuthorized: state.application.authorized,
    canAddUser: state.application.rights.user.edit,
    canAddProblems: state.application.rights.problem.add,
    canAddSet: state.application.rights.setOfProblems.add,
});

export default connect(mapStateToProps)(NavigationPanel);