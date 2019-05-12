import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../actions'
import SignInDialog from './signDialog'

import './css/signForm.css'
import './css/button.css'

const UserControls = (props) => {
    const { authorized,  signOut} = props;
    if (!authorized) {
        return <SignInDialog/>
    }

    return (
        <div className={'appbar__button-panel'}>
            <button onClick={signOut} className={'appbar__button'}>
                Sign out
            </button>
        </div>
    );
};

UserControls.propTypes = {
    authorized: PropTypes.bool.isRequired,
    signOut: PropTypes.func.isRequired
};

export default connect(state => ({
    authorized: state.application.authorized
}), actions)(UserControls)