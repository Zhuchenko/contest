import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from '../../components/input'
import {connect} from 'react-redux'
import * as actions from '../actions'
import {validateEmail, validatePassword, validateRepeatPassword, validateInput} from '../../utilities/checks'

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

    check = () =>{
        const {username, password, repeatPassword, email, name, lastname} = this.props;

        const usernameErrorMessage = validateInput(username.value);
        if(usernameErrorMessage){
            this.props.usernameIsNotValid({username:username.value, errorMessage:usernameErrorMessage})
        }

        const passwordErrorMessage = validatePassword(password.value);
        if(passwordErrorMessage){
            this.props.passwordIsNotValid({password:password.value, errorMessage: passwordErrorMessage})
        }

        const repeatPasswordErrorMessage = validateRepeatPassword(repeatPassword.value);
        if(repeatPasswordErrorMessage){
            this.props.passwordIsNotValid({repeatPassword:repeatPassword.value, errorMessage: repeatPasswordErrorMessage})
        }

        const emailErrorMessage = validateEmail(email.value);
        if(emailErrorMessage){
            this.props.passwordIsNotValid({email:email.value, errorMessage: emailErrorMessage})
        }

        const nameErrorMessage = validateInput(name.value);
        if(nameErrorMessage){
            this.props.usernameIsNotValid({name:name.value, errorMessage:nameErrorMessage})
        }

        const lastnameErrorMessage = validateInput(lastname.value);
        if(lastnameErrorMessage) {
            this.props.usernameIsNotValid({lastname: lastname.value, errorMessage: lastnameErrorMessage})
        }
    };

    signUp = () => {
        this.check();
        const {username, password, repeatPassword, email, name, lastname} = this.props;
        if (username.isValid && password.isValid && repeatPassword.isValid && email.isValid && name.isValid && lastname.isValid) {
            this.props.signup({
                username: username.value,
                password: password.value,
                email: email.value,
                name: name.value,
                lastname: lastname.value
            });
        }
    }

    render() {
        const {username, password, repeatPassword, email, name, lastname, hideForm} = this.props;

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
                placeholder: 'lastname',
                ...lastname,
                onChange:this.handleChangedLastname
            },
            {
                placeholder: 'password',
                ...password,
                onChange:this.handleChangedPassword
            },
            {
                placeholder: 'repeat password',
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
    signup: PropTypes.func.isRequired,
    hideForm: PropTypes.func.isRequired,
    enterUsername: PropTypes.func.isRequired,
    enterPassword: PropTypes.func.isRequired,
    enterRepeatPassword: PropTypes.func.isRequired,
    enterEmail: PropTypes.func.isRequired,
    enterName: PropTypes.func.isRequired,
    enterLastname: PropTypes.func.isRequired,
    username: PropTypes.object.isRequired,
    password: PropTypes.object.isRequired,
    repeatPassword: PropTypes.object.isRequired,
    email: PropTypes.object.isRequired,
    name: PropTypes.object.isRequired,
    lastname: PropTypes.object.isRequired,
};

export default connect(state => ({
    username: state.authorization.username,
    password: state.authorization.password,
    repeatPassword: state.authorization.repeatPassword,
    email: state.authorization.email,
    name: state.authorization.name,
    lastname: state.authorization.lastname,
}), actions)(SignUpForm)