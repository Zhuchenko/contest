import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from '../../components/input'
import {connect} from 'react-redux'
import * as actions from '../actions'
import {validateEmail, validatePassword, validateRepeatPassword, validateInput} from '../../utilities/checks'

import './css/signForm.css'
import './css/button.css'

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

    handleChangedLastName = (event) => {
        const lastName = event.target.value;
        this.props.enterLastName({lastName});
    };

    check = async () =>{
        const {username, password, repeatPassword, email, name, lastName} = this.props;

        const usernameErrorMessage = validateInput(username.value);
        if(usernameErrorMessage){
            await this.props.usernameIsNotValid({value:username.value, errorMessage:usernameErrorMessage})
        }

        const passwordErrorMessage = validatePassword(password.value);
        if(passwordErrorMessage){
            await this.props.passwordIsNotValid({value:password.value, errorMessage: passwordErrorMessage})
        }

        const repeatPasswordErrorMessage = validateRepeatPassword(password.value, repeatPassword.value);
        if(repeatPasswordErrorMessage){
            await this.props.repeatPasswordIsNotValid({value:repeatPassword.value, errorMessage: repeatPasswordErrorMessage})
        }

        const emailErrorMessage = validateEmail(email.value);
        if(emailErrorMessage){
            console.log('emailErrorMessage: ' + emailErrorMessage)
            await this.props.emailIsNotValid({value:email.value, errorMessage: emailErrorMessage})
        }

        const nameErrorMessage = validateInput(name.value);
        if(nameErrorMessage){
            await this.props.nameIsNotValid({value:name.value, errorMessage:nameErrorMessage})
        }

        const lastNameErrorMessage = validateInput(lastName.value);
        if(lastNameErrorMessage) {
            await this.props.lastNameIsNotValid({value: lastName.value, errorMessage: lastNameErrorMessage})
        }
    };

    signUp = async () => {
        await this.check();
        const {username, password, repeatPassword, email, name, lastName} = this.props;
        if (username.isValid && password.isValid && repeatPassword.isValid && email.isValid && name.isValid && lastName.isValid) {
            this.props.signUp({
                username: username.value,
                password: password.value,
                email: email.value,
                name: name.value,
                lastName: lastName.value
            });
        }
    }

    render() {
        const {username, password, repeatPassword, email, name, lastName, hideForm} = this.props;

        const inputs = [
            {
                placeholder: 'username',
                ...username,
                onChange:this.handleChangedUsername
            },
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
    enterUsername: PropTypes.func.isRequired,
    enterPassword: PropTypes.func.isRequired,
    enterRepeatPassword: PropTypes.func.isRequired,
    enterEmail: PropTypes.func.isRequired,
    enterName: PropTypes.func.isRequired,
    enterLastName: PropTypes.func.isRequired,
    username: PropTypes.object.isRequired,
    password: PropTypes.object.isRequired,
    repeatPassword: PropTypes.object.isRequired,
    email: PropTypes.object.isRequired,
    name: PropTypes.object.isRequired,
    lastName: PropTypes.object.isRequired,
    usernameIsNotValid: PropTypes.func.isRequired,
    passwordIsNotValid: PropTypes.func.isRequired,
    repeatPasswordIsNotValid: PropTypes.func.isRequired,
    emailIsNotValid: PropTypes.func.isRequired,
    nameIsNotValid: PropTypes.func.isRequired,
    lastNameIsNotValid: PropTypes.func.isRequired,
};

export default connect(state => ({
    username: state.authorization.username,
    password: state.authorization.password,
    repeatPassword: state.authorization.repeatPassword,
    email: state.authorization.email,
    name: state.authorization.name,
    lastName: state.authorization.lastName,
}), actions)(SignUpForm)