import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CustomInput from '../common/CustomInput'
import {connect} from 'react-redux'
import * as actions from '../../redux/authorization/actions'
import {validateEmail, validateInput, validatePassword, validateRepeatPassword} from '../../utilities/checks'

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
                errorMessage: 'it is not valid',
                onChange: this.handleChangedEmail
            },
            {
                placeholder: 'name',
                value: name,
                onChange: this.handleChangedName
            },
            {
                placeholder: 'last name',
                value: lastName,
                onChange: this.handleChangedLastName
            },
            {
                placeholder: 'auth key',
                value: authKey,
                onChange: this.handleChangedAuthKey
            },
            {
                placeholder: 'password',
                type: 'password',
                value: password,
                errorMessage: 'it is not equal to the requirements',
                onChange: this.handleChangedPassword
            },
            {
                placeholder: 'repeat password',
                type: 'password',
                value: repeatPassword,
                errorMessage: 'it does not match',
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
                                     errorMessage={errorMessage ?? 'it is required'}
                                     handleKeyPress={this.handleKeyPress}
                        />
                    )
                }
                <div className={'dialog__button-panel'}>
                    <button onClick={this.signUp} className={'button sign__button'}>Sign up</button>
                    <button onClick={hideForm} className={'button sign__button'}>Cancel</button>
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