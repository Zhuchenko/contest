import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import * as actions from '../actions'
import Input from '../../components/input';
import {validateInput} from '../../utilities/checks';

import './css/signDialog.css'

class SignInForm extends Component {
    handleChangedUsername = (event) => {
        const username = event.target.value;
        this.props.enterUsername({username});
    };

    handleChangedPassword = (event) => {
        const password = event.target.value;
        this.props.enterPassword({password});
    };

    check = () =>{
        const {username, password, usernameIsNotValid, passwordIsNotValid} = this.props;

        const usernameErrorMessage = validateInput(username.value);
        console.log('usernameErrorMessage ' + usernameErrorMessage)
        if(usernameErrorMessage){
            usernameIsNotValid({username:username.value, errorMessage:usernameErrorMessage})
        }

        const passwordErrorMessage = validateInput(password.value);
        console.log('passwordErrorMessage ' + passwordErrorMessage)
        if(passwordErrorMessage){
            console.log('im here')
            passwordIsNotValid({password:password.value, errorMessage:passwordErrorMessage})
        }
    };

    signIn = () => {
        this.check();
        const {username, password} = this.props;
        console.log('check username.isValid ' + username.isValid)
        console.log('check password.isValid ' + password.isValid)
        if(username.isValid && password.isValid) {
            this.props.signin({username: username.value, password: password.value});
        }
    };

    render() {
        const {username, password, hideForm} = this.props;
        const inputs = [
            {
                placeholder: 'username',
                ...username,
                onChange:this.handleChangedUsername
            },
            {
                placeholder: 'password',
                ...password,
                onChange:this.handleChangedPassword
            }
        ];

        return (
            <div className={'sign__form'}>
                {
                    inputs.map(item =>
                        <Input key={item.placeholder}
                               placeholder={item.placeholder}
                               value={item.value}
                               isValid={item.isValid}
                               errorMessage={item.errorMessage}
                               onChange={item.onChange} />
                    )
                }
                <div className={'sign__button-panel'}>
                    <button onClick={this.signIn} className={'sign__button'}>Sign in</button>
                    <button onClick={hideForm} className={'sign__button'}>Cancel</button>
                </div>
            </div>
        )
    }
}

SignInForm.propTypes = {
    signin: PropTypes.func.isRequired,
    hideForm: PropTypes.func.isRequired,
    enterUsername: PropTypes.func.isRequired,
    enterPassword: PropTypes.func.isRequired,
    username: PropTypes.object.isRequired,
    password: PropTypes.object.isRequired,
    usernameIsNotValid: PropTypes.func.isRequired,
    passwordIsNotValid: PropTypes.func.isRequired
};

export default connect(state => ({
    username: state.authorization.username,
    password: state.authorization.password
}), actions)(SignInForm)