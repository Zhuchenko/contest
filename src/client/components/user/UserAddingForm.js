import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CustomInput from '../common/CustomInput'
import roles from './roles'
import {connect} from 'react-redux'
import * as actions from '../../redux/user/actions'
import getTranslations from '../../utilities/getTranslations'

class UserAddingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastName: '',
            roleIndex: 0,
            authKey: '',
        }
    }

    add = () => {
        const {name, lastName, roleIndex, authKey} = this.state;
        const role = roles[roleIndex].name;
        const {addUser, close} = this.props;
        addUser({name, lastName, role, authKey});
        close();
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

    onChange = ({target: {value}}) => {
        this.setState({roleIndex: value});
    };

    handleKeyPress = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.add();
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            this.props.close();
        }
    };

    render() {
        const {name, lastName, roleIndex, authKey} = this.state;
        return (
            <div className={'dialog scrollbar'}>
                <CustomInput key='name'
                       placeholder={getTranslations({text: 'name'})}
                       value={name}
                       onChange={this.handleChangedName}
                       handleKeyPress={this.handleKeyPress}/>
                <CustomInput key='lastName'
                       placeholder={getTranslations({text: 'last name'})}
                       value={lastName}
                       onChange={this.handleChangedLastName}
                       handleKeyPress={this.handleKeyPress}/>
                <select onChange={this.onChange} defaultValue={roleIndex}>
                    {
                        roles.map((role, i) => (
                            <option key={i} value={i} label={getTranslations({text: role.name})}/>
                        ))
                    }
                </select>
                <CustomInput key='authKey'
                       placeholder="Auth key"
                       value={authKey}
                       onChange={this.handleChangedAuthKey}
                       handleKeyPress={this.handleKeyPress}/>
                <div className={'dialog__button-panel'}>
                    <button className={'button'} onClick={this.add}>{getTranslations({text: 'add'})}</button>
                    <button className={'button'} onClick={this.props.close}>{getTranslations({text: 'cancel'})}</button>
                </div>
            </div>
        )
    }
}

UserAddingForm.propTypes = {
    close: PropTypes.func.isRequired,
    addUser: PropTypes.func.isRequired
};

export default connect(null, actions)(UserAddingForm)
