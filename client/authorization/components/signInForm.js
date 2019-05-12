import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import * as actions from '../actions'
import Input from '../../components/input';
import {validateInput} from '../../utilities/checks';

import './css/signForm.css'
import './css/button.css'

class SignInForm extends Component {
    handleChangedUsername = (event) => {
        const username = event.target.value;
        this.props.enterUsername({username});
    };

    handleChangedPassword = (event) => {
        const password = event.target.value;
        this.props.enterPassword({password});
    };

    check = async () =>{
        const {username, password, usernameIsNotValid, passwordIsNotValid} = this.props;

        const usernameErrorMessage = validateInput(username.value);
        if(usernameErrorMessage){
            await usernameIsNotValid({value:username.value, errorMessage:usernameErrorMessage})
        }

        const passwordErrorMessage = validateInput(password.value);
        if(passwordErrorMessage){
            await passwordIsNotValid({value:password.value, errorMessage:passwordErrorMessage})
        }
    };

    signIn = async () => {
        await this.check();
        const {username, password} = this.props;

        if(username.isValid && password.isValid) {
            this.props.signIn({username: username.value, password: password.value});
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
                type: 'password',
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
                               type={item.type}
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
    signIn: PropTypes.func.isRequired,
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