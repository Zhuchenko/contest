import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import * as actions from '../actions'

import './css/signDialog.css'

class SignUpForm extends Component {
    handleChangedUsername = (event) => {
        const username = event.target.value;
        this.props.enterUsername({username});
    };

    handleChangedPassword = (event) => {
        const password = event.target.value;
        this.props.enterPassword({password});
    };

    signUp = () => {
        const {username, password} = this.props;
        this.props.signup({username, password});
    };

    render() {
        const {username, password, hideForm} = this.props;

        return (
            <div className={'sign__form'}>
                <input
                    type='text'
                    placeholder="username"
                    onChange={this.handleChangedUsername}
                    value={username}
                    className={'sign__input'}/>
                <input
                    type='text'
                    placeholder="password"
                    onChange={this.handleChangedPassword}
                    value={password}
                    className={'sign__input'}/>

                <div className={'sign__button-panel'}>
                    <button onClick={this.signUp} className={'sign__button'}>Sign up</button>
                    <button onClick={hideForm} className={'sign__button'}>Cancel</button>
                </div>
            </div>
        )
    }
}

SignUpForm.propTypes = {
    signup: PropTypes.func.isRequired,
    hideForm: PropTypes.func.isRequired,
    enterUsername: PropTypes.func.isRequired,
    enterPassword: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
};

export default connect(state => ({
    username: state.authorization.username,
    password: state.authorization.password,
}), actions)(SignUpForm)