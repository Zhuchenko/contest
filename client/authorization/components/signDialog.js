import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Popup from './popup';
import SignInForm from './signInForm';
import SignUpForm from './signUpForm';
import TabBar from '../../components/tabBar';

import './css/signDialog.css'
import './css/button.css'

const signIn = {
    id: "signIn",
    text: "Sign in"
};

const signUp = {
    id: "signUp",
    text: "Sign up"
};

class SignDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedId: -1};
        this.tabs = [signIn, signUp];
    }

    handleChanged = (tab) => {
        const {showForm} = this.props;
        this.setState({selectedId: tab});
        showForm();
    };

    showSignInForm = () => {this.handleChanged(signIn.id)};

    showSignUpForm = () => {this.handleChanged(signUp.id)};

    render() {
        const {isShown} = this.props;

        return (
            <React.Fragment>
                <div className={'appbar__button-panel'}>
                <button onClick={this.showSignInForm} className={'appbar__button'}>
                    {signIn.text}
                </button>
                <button onClick={this.showSignUpForm} className={'appbar__button'}>
                    {signUp.text}
                </button>
                </div>
                {
                    isShown &&
                    <Popup>
                        <div className={'sign__dialog'}>
                            <TabBar handleChanged={this.handleChanged} tabs={this.tabs} selectedId={this.state.selectedId}/>
                            {
                                (this.state.selectedId === signIn.id) &&
                                <SignInForm/>
                            }
                            {
                                (this.state.selectedId === signUp.id) &&
                                <SignUpForm/>
                            }
                                </div>
                    </Popup>
                }
            </React.Fragment>
        )
    }
}
SignDialog.propTypes = {
    isShown: PropTypes.bool.isRequired,
    showForm: PropTypes.func.isRequired,
};

export default connect(state => ({
    isShown: state.authorization.isShown
}), actions)(SignDialog)