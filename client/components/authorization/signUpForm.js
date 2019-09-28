import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from '../common/input'
import {connect} from 'react-redux'
import * as actions from '../../redux/authorization/actions'
import {validateEmail, validatePassword, validateRepeatPassword, validateInput} from '../../utilities/checks'

import './css/signForm.css'
import './css/appbar__button.css'

class SignUpForm extends Component {
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

    handleChangedLastName = (event) => {
        const lastName = event.target.value;
        this.props.enterLastName({lastName});
    };

    check = async () =>{
        const {email, password, repeatPassword, name, lastName} = this.props;

        const emailErrorMessage = validateEmail(email.value);
        if(emailErrorMessage){
            await this.props.emailIsNotValid({errorMessage: emailErrorMessage})
        }

        const passwordErrorMessage = validatePassword(password.value);
        if(passwordErrorMessage){
            await this.props.passwordIsNotValid({errorMessage: passwordErrorMessage})
        }

        const repeatPasswordErrorMessage = validateRepeatPassword(password.value, repeatPassword.value);
        if(repeatPasswordErrorMessage){
            await this.props.repeatPasswordIsNotValid({errorMessage: repeatPasswordErrorMessage})
        }

        const nameErrorMessage = validateInput(name.value);
        if(nameErrorMessage){
            await this.props.nameIsNotValid({errorMessage:nameErrorMessage})
        }

        const lastNameErrorMessage = validateInput(lastName.value);
        if(lastNameErrorMessage) {
            await this.props.lastNameIsNotValid({errorMessage: lastNameErrorMessage})
        }
    };

    signUp = async () => {
        await this.check();
        const {email, password, repeatPassword, name, lastName} = this.props;
        if (email.isValid && password.isValid && repeatPassword.isValid && name.isValid && lastName.isValid) {
            this.props.signUp({
                email: email.value,
                password: password.value,
                name: name.value,
                lastName: lastName.value
            });
        }
    };

    render() {
        const {email, password, repeatPassword, name, lastName, hideForm} = this.props;

        const inputs = [
            {
                placeholder: 'email',
                ...email,
                onChange:this.handleChangedEmail
            },
            {
                placeholder: 'name',
                ...name,
                onChange:this.handleChangedName
            },
            {
                placeholder: 'last name',
                ...lastName,
                onChange:this.handleChangedLastName
            },
            {
                placeholder: 'password',
                type: 'password',
                ...password,
                onChange:this.handleChangedPassword
            },
            {
                placeholder: 'repeat password',
                type: 'password',
                ...repeatPassword,
                onChange:this.handleChangedRepeatPassword
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
                    <button onClick={this.signUp} className={'sign__button'}>Sign up</button>
                    <button onClick={hideForm} className={'sign__button'}>Cancel</button>
                </div>
            </div>
        )
    }
}

SignUpForm.propTypes = {
    signUp: PropTypes.func.isRequired,
    hideForm: PropTypes.func.isRequired,
    enterEmail: PropTypes.func.isRequired,
    enterPassword: PropTypes.func.isRequired,
    enterRepeatPassword: PropTypes.func.isRequired,
    enterName: PropTypes.func.isRequired,
    enterLastName: PropTypes.func.isRequired,
    email: PropTypes.object.isRequired,
    password: PropTypes.object.isRequired,
    repeatPassword: PropTypes.object.isRequired,
    name: PropTypes.object.isRequired,
    lastName: PropTypes.object.isRequired,
    emailIsNotValid: PropTypes.func.isRequired,
    passwordIsNotValid: PropTypes.func.isRequired,
    repeatPasswordIsNotValid: PropTypes.func.isRequired,
    nameIsNotValid: PropTypes.func.isRequired,
    lastNameIsNotValid: PropTypes.func.isRequired,
};

export default connect(state => ({
    email: state.authorization.email,
    password: state.authorization.password,
    repeatPassword: state.authorization.repeatPassword,
    name: state.authorization.name,
    lastName: state.authorization.lastName,
}), actions)(SignUpForm)