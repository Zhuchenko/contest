import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import * as actions from '../../redux/authorization/actions'
import Input from '../common/input';

import './css/signForm.css'
import './css/appbar__button.css'

class SIgnInForm extends Component {
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
                placeholder: 'password',
                type: 'password',
                value: password,
                onChange: this.handleChangedPassword
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
                               onChange={item.onChange}/>
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

SIgnInForm.propTypes = {
    signIn: PropTypes.func.isRequired,
    hideForm: PropTypes.func.isRequired,
};

export default connect(null, actions)(SIgnInForm)