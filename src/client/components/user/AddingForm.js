import React, {Component} from 'react'
import PropTypes from "prop-types";
import {addUser} from "../../services/userApi";
import Input from "../common/input";
import roles from './roles'

//import './css/user.css';

class AddingForm extends Component {
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
        addUser({name, lastName, role, authKey})
            .then(() => {
                    this.props.close()
                }
            )
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

    render() {
        const {name, lastName, roleIndex, authKey} = this.state;
        return (
            <div>
                <Input key='name'
                       placeholder="Name"
                       value={name}
                       onChange={this.handleChangedName}/>
                <Input key='lastName'
                       placeholder="Last Name"
                       value={lastName}
                       onChange={this.handleChangedLastName}/>
                <select onChange={this.onChange} defaultValue={roleIndex}>
                    {
                        roles.map((role, i) => (
                            <option key={i} value={i} label={role.name}/>
                        ))
                    }
                </select>
                <Input key='authKey'
                       placeholder="Auth Key"
                       value={authKey}
                       onChange={this.handleChangedAuthKey}/>
                <button onClick={this.add}>Add</button>
                <button onClick={this.props.close}>Cancel</button>
            </div>
        )
    }
}

AddingForm.propTypes = {
    close: PropTypes.func.isRequired
};

export default AddingForm
