import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Input from '../common/input'
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

    render() {
        const {email, password, repeatPassword, name, lastName, authKey, invalidFields} = this.state;
        const {hideForm} = this.props;

        const inputs = [
            {
                name: 'email',
                value: email,
                errorMessage: 'it is not valid',
                onChange: this.handleChangedEmail
            },
            {
                name: 'name',
                value: name,
                onChange: this.handleChangedName
            },
            {
                name: 'last name',
                value: lastName,
                onChange: this.handleChangedLastName
            },
            {
                name: 'auth key',
                value: authKey,
                onChange: this.handleChangedAuthKey
            },
            {
                name: 'password',
                type: 'password',
                value: password,
                errorMessage: 'it is not equal to the requirements',
                onChange: this.handleChangedPassword
            },
            {
                name: 'repeat password',
                type: 'password',
                value: repeatPassword,
                errorMessage: 'it does not match',
                onChange: this.handleChangedRepeatPassword
            }
        ];

        return (
            <div className={'sign__form'}>
                {
                    inputs.map(item =>
                        <Input key={item.name}
                               placeholder={item.name}
                               value={item.value}
                               type={item.type}
                               isValid={!invalidFields.includes(item.name)}
                               errorMessage={item.errorMessage ?? 'it is required'}
                               onChange={item.onChange}/>
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
};

export default connect(null, actions)(SignUpForm)