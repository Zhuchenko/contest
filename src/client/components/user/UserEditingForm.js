import React, {Component} from 'react'
import PropTypes from 'prop-types'
import pickBy from 'lodash/pickBy';
import {getUnverifiedUser, getUser} from '../../services/userApi'
import roles from './roles'
import CustomInput from '../common/CustomInput'
import {connect} from 'react-redux'
import * as actions from '../../redux/user/actions'

class UserEditingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',
                touched: false
            },
            lastName: {
                value: '',
                touched: false
            },
            email: {
                value: '',
                touched: false
            },
            roleIndex: {
                value: 0,
                touched: false
            },
            authKey: {
                value: '',
                touched: false
            },
        }
    }

    componentDidMount() {
        if (this.props.unverified) {
            getUnverifiedUser(this.props.id)
                .then(user => {
                    const {name, lastName, role, email, authKey} = user;
                    this.setState({
                        name: {value: name, touched: false},
                        lastName: {value: lastName, touched: false},
                        roleIndex: {value: role === 'participant' ? 0 : 1, touched: false},
                        email: {value: email ?? null, touched: false},
                        authKey: {value: authKey, touched: false},
                    })
                })
        } else {
            getUser(this.props.id)
                .then(user => {
                    const {name, lastName, role, email, authKey} = user;
                    this.setState({
                        name: {value: name, touched: false},
                        lastName: {value: lastName, touched: false},
                        roleIndex: {value: role === 'participant' ? 0 : 1, touched: false},
                        email: {value: email, touched: false},
                    })
                })
        }
    }

    edit = () => {
        const {name, lastName, email, roleIndex, authKey} = this.state;
        const {id, unverified, editUser, close} = this.props;

        let newState = unverified ? pickBy({
            name: name.touched ? name.value : null,
            lastName: lastName.touched ? lastName.value : null,
            email: email.touched ? email.value : null,
            role: roleIndex.touched ? roles[roleIndex.value].name : null,
            authKey: authKey.touched ? authKey.value : null
        }) : pickBy({
            name: name.touched ? name.value : null,
            lastName: lastName.touched ? lastName.value : null,
            email: email.touched ? email.value : null,
            role: roleIndex.touched ? roles[roleIndex.value].name : null,
        });

        editUser({id, newState, unverified});
        close();
    };

    handleChangedName = ({target: {value}}) => {
        this.setState({name: {value, touched: true}});
    };

    handleChangedLastName = ({target: {value}}) => {
        this.setState({lastName: {value, touched: true}});
    };

    handleChangedEmail = ({target: {value}}) => {
        this.setState({email: {value, touched: true}});
    };

    handleChangedAuthKey = ({target: {value}}) => {
        this.setState({authKey: {value, touched: true}});
    };

    onChange = ({target: {value}}) => {
        this.setState({roleIndex: {value, touched: true}});
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
        const {name, lastName, email, roleIndex, unverified, authKey} = this.state;
        const {canChangeRole} = this.props;
        return (
            <div>
                <CustomInput key='name'
                             placeholder="Name"
                             value={name.value}
                             onChange={this.handleChangedName}
                             handleKeyPress={this.handleKeyPress}/>
                <CustomInput key='lastName'
                             placeholder="Last Name"
                             value={lastName.value}
                             onChange={this.handleChangedLastName}
                             handleKeyPress={this.handleKeyPress}/>
                {
                    email.value &&
                    <CustomInput key='email'
                                 placeholder="email"
                                 value={email.value}
                                 onChange={this.handleChangedEmail}
                                 handleKeyPress={this.handleKeyPress}/>
                }
                {
                    canChangeRole &&
                    <select onChange={this.onChange} value={roleIndex.value}>
                        {
                            roles.map((role, i) => (
                                <option key={i} value={i} label={role.name}/>
                            ))
                        }
                    </select>
                }
                {
                    this.props.unverified &&
                    <CustomInput key='authKey'
                                 placeholder="Auth Key"
                                 value={authKey.value}
                                 onChange={this.handleChangedAuthKey}
                                 handleKeyPress={this.handleKeyPress}/>
                }
                <button onClick={this.edit}>Save</button>
                <button onClick={this.props.close}>Cancel</button>
            </div>
        )
    }
}

UserEditingForm.propTypes = {
    id: PropTypes.string.isRequired,
    unverified: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired,
    canChangeRole: PropTypes.bool.isRequired
};

export default connect(state => ({
    canChangeRole: state.application.rights.user.changeRole
}), actions)(UserEditingForm)