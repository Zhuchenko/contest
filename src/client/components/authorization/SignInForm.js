import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import * as actions from '../../redux/authorization/actions'
import CustomInput from '../common/CustomInput';
import getTranslations from '../../utilities/getTranslations';

import './css/signForm.css'
import './css/appbar__button.css'

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChangedEmail = ({target: {value}}) => {
        this.setState({email: value});
    };

    handleChangedPassword = ({target: {value}}) => {
        this.setState({password: value});
    };

    signIn = () => {
        const {email, password} = this.state;
        this.props.signIn({email, password});
    };

    handleKeyPress = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.signIn();
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            this.props.hideForm();
        }
    };

    render() {
        const {email, password} = this.state;
        const {hideForm} = this.props;

        const inputs = [
            {
                placeholder: 'email',
                value: email,
                onChange: this.handleChangedEmail
            },
            {
                placeholder: getTranslations({text: 'password', format: 'lowercase'}),
                type: 'password',
                value: password,
                onChange: this.handleChangedPassword
            }
        ];

        //TODO: add check for correct email and password set
        return (
            <div className={'sign__form'}>
                {
                    inputs.map((item) =>
                        <CustomInput key={item.placeholder}
                                     {...item}
                                     handleKeyPress={this.handleKeyPress}
                        />
                    )
                }
                <div className={'dialog__button-panel'}>
                    <button onClick={this.signIn} className={'button sign__button'}>{getTranslations({text: 'Sign in'})}</button>
                    <button onClick={hideForm} className={'button sign__button'}>{getTranslations({text: 'Cancel'})}</button>
                </div>
            </div>
        )
    }
}

SignInForm.propTypes = {
    signIn: PropTypes.func.isRequired,
    hideForm: PropTypes.func.isRequired,
};

export default connect(null, actions)(SignInForm)