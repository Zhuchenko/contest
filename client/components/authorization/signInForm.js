import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import * as actions from '../../redux/authorization/actions'
import Input from '../common/input';
import {validateInput} from '../../utilities/checks';

import './css/signForm.css'
import './css/appbar__button.css'

class SignInForm extends Component {
    handleChangedEmail = (event) => {
        const email = event.target.value;
        this.props.enterEmail({email});
    };

    handleChangedPassword = (event) => {
        const password = event.target.value;
        this.props.enterPassword({password});
    };

    check = async () =>{
        const {email, password, emailIsNotValid, passwordIsNotValid} = this.props;

        const emailErrorMessage = validateInput(email.value);
        if(emailErrorMessage){
            await emailIsNotValid({errorMessage: emailErrorMessage})
        }

        const passwordErrorMessage = validateInput(password.value);
        if(passwordErrorMessage){
            await passwordIsNotValid({errorMessage:passwordErrorMessage})
        }
    };

    signIn = async () => {
        await this.check();
        const {email, password} = this.props;

        if(email.isValid && password.isValid) {
            this.props.signIn({email: email.value, password: password.value});
        }
    };

    render() {
        const {email, password, hideForm} = this.props;
        const inputs = [
            {
                placeholder: 'email',
                ...email,
                onChange:this.handleChangedEmail
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
    enterEmail: PropTypes.func.isRequired,
    enterPassword: PropTypes.func.isRequired,
    email: PropTypes.object.isRequired,
    password: PropTypes.object.isRequired,
    emailIsNotValid: PropTypes.func.isRequired,
    passwordIsNotValid: PropTypes.func.isRequired
};

export default connect(state => ({
    email: state.authorization.email,
    password: state.authorization.password
}), actions)(SignInForm)