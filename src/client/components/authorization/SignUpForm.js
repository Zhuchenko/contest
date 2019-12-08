import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CustomInput from '../common/CustomInput'
import {connect} from 'react-redux'
import * as actions from '../../redux/authorization/actions'
import {validateEmail, validateInput, validatePassword, validateRepeatPassword} from '../../utilities/checks'
import getTranslations from '../../utilities/getTranslations'

import './css/signForm.css'
import './css/appbar__button.css'

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            lastName: '',
            authKey: '',
            password: '',
            repeatPassword: '',
            invalidFields: []
        }
    }

    handleChangedPassword = ({target: {value}}) => {
        this.setState({password: value});
    };

    handleChangedRepeatPassword = ({target: {value}}) => {
        this.setState({repeatPassword: value});
    };

    handleChangedEmail = ({target: {value}}) => {
        this.setState({email: value});
    };

    handleChangedName = ({target: {value}}) => {
        this.setState({name: value});
    };

    handleChangedLastName = ({target: {value}}) => {
        this.setState({lastName: value});
    };

    handleChangedAuthKey = ({target: {value}}) => {
        this.setState({authKey: value});
    };

    checkFields = () => {
        const {email, password, repeatPassword, name, lastName, authKey} = this.state;
        const invalidFields = [];
        if (!validateEmail(email)) {
            invalidFields.push('email')
        }
        if (!validatePassword(password)) {
            invalidFields.push('password')
        }
        if (!validateRepeatPassword(password, repeatPassword)) {
            invalidFields.push('repeat password')
        }
        if (!validateInput(name)) {
            invalidFields.push('name')
        }
        if (!validateInput(lastName)) {
            invalidFields.push('last name')
        }
        if (!validateInput(authKey)) {
            invalidFields.push('auth key')
        }
        return invalidFields;
    };

    signUp = () => {
        this.setState({invalidFields: this.checkFields()}, () => {
            const {email, password, name, lastName, authKey, invalidFields} = this.state;
            if (invalidFields.length > 0) {
                return;
            }
            this.props.signUp({
                email,
                password,
                name,
                lastName,
                authKey
            });
        })
    };

    handleKeyPress = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.signUp();
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            this.props.hideForm();
        }
    };

    render() {
        const {email, password, repeatPassword, name, lastName, authKey, invalidFields} = this.state;
        const {hideForm} = this.props;

        const inputs = [
            {
                placeholder: 'email',
                value: email,
                errorMessage: getTranslations({text: 'it is not valid', format: 'lowercase'}),
                onChange: this.handleChangedEmail
            },
            {
                placeholder: getTranslations({text: 'name', format: 'lowercase'}),
                value: name,
                onChange: this.handleChangedName
            },
            {
                placeholder: getTranslations({text: 'last name', format: 'lowercase'}),
                value: lastName,
                onChange: this.handleChangedLastName
            },
            {
                //TODO: does it need to be translated?
                placeholder: 'auth key',
                value: authKey,
                onChange: this.handleChangedAuthKey
            },
            {
                placeholder: getTranslations({text: 'password', format: 'lowercase'}),
                type: 'password',
                value: password,
                errorMessage: getTranslations({text: 'it is not equal to the requirements', format: 'lowercase'}),
                onChange: this.handleChangedPassword
            },
            {
                placeholder: getTranslations({text: 'repeat password', format: 'lowercase'}),
                type: 'password',
                value: repeatPassword,
                errorMessage: getTranslations({text: 'it does not match', format: 'lowercase'}),
                onChange: this.handleChangedRepeatPassword
            }
        ];

        return (
            <div className={'sign__form'}>
                {
                    inputs.map(({placeholder, value, type, onChange, errorMessage}) =>
                        <CustomInput key={placeholder}
                                     {...{placeholder, value, type, onChange}}
                                     isValid={!invalidFields.includes(placeholder)}
                                     errorMessage={errorMessage ?? getTranslations({text: 'it is required', format: 'lowercase'})}
                                     handleKeyPress={this.handleKeyPress}
                        />
                    )
                }
                <div className={'dialog__button-panel'}>
                    <button onClick={this.signUp} className={'button sign__button'}>{getTranslations({text: 'sign up'})}</button>
                    <button onClick={hideForm} className={'button sign__button'}>{getTranslations({text: 'cancel'})}</button>
                </div>
            </div>
        )
    }
}

SignUpForm.propTypes = {
    signUp: PropTypes.func.isRequired,
    hideForm: PropTypes.func.isRequired,
};

export default connect(null, actions)(SignUpForm)