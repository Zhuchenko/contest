import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from '../../components/input'
import {connect} from 'react-redux'
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

    handleChangedRepeatPassword = (event) => {
        const repeatPassword = event.target.value;
        this.props.enterRepeatPassword({repeatPassword});
    };

    handleChangedEmail = (event) => {
        const email = event.target.value;
        this.props.enterEmail({email});
    };


    handleChangedName = (event) => {
        const name = event.target.value;
        this.props.enterName({name});
    };

    handleChangedLastname = (event) => {
        const lastname = event.target.value;
        this.props.enterLastname({lastname});
    };

    signUp = () => {
        const {username, password, email, name, lastname} = this.props;
        this.props.signup({username, password, email, name, lastname});
    };

    render() {
        const {username, password, repeatPassword, email, name, lastname, hideForm} = this.props;

        return (
            <div className={'sign__form'}>
                <Input placeholder="username" onChange={this.handleChangedUsername} value={username}/>
                <Input placeholder="email" onChange={this.handleChangedEmail} value={email}/>
                <Input placeholder="name" onChange={this.handleChangedName} value={name}/>
                <Input placeholder="lastname" onChange={this.handleChangedLastname} value={lastname}/>
                <Input placeholder="password" onChange={this.handleChangedPassword} value={password}/>
                <Input placeholder="password" onChange={this.handleChangedRepeatPassword} value={repeatPassword}/>

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
    enterRepeatPassword: PropTypes.func.isRequired,
    enterEmail: PropTypes.func.isRequired,
    enterName: PropTypes.func.isRequired,
    enterLastname: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    repeatPassword: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
};

export default connect(state => ({
    username: state.authorization.username,
    password: state.authorization.password,
}), actions)(SignUpForm)