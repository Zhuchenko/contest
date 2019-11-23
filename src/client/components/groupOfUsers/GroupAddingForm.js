import React, {Component} from 'react'
import PropTypes from "prop-types";
import Input from "../common/input";
import {connect} from "react-redux";
import * as actions from "../../redux/groupOfUsers/actions";
import getList from "../common/List";
import UserItemWithCheckBox from "./UserItemWithCheckBox";
import {getUsersForGroupCreating} from "../../services/groupOfUsersApi";

//import './css/user.css';

class GroupAddingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            users: []
        }
    }

    componentDidMount() {
        getUsersForGroupCreating()
            .then((users) => {
                const usersWithSelecting = users.map(user => ({
                    ...user,
                    isSelected: false
                }));
                this.setState({
                    users: usersWithSelecting
                })
            })
    }

    add = () => {
        const {name, users} = this.state;
        const selectedUsers = users.filter(user => user.isSelected).map(user => user.id);
        const {addGroup, close} = this.props;
        addGroup({name, users: selectedUsers});
        close();
    };

    handleChangedName = ({target: {value}}) => {
        this.setState({name: value});
    };

    handleChecked = (id) => {
        const {users} = this.state;
        const index = users.findIndex(user => user.id === id);
        users[index].isSelected = !users[index].isSelected;
        this.setState({users})
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
        const {name, users} = this.state;
        const List = getList(UserItemWithCheckBox, users);
        return (
            <div>
                <Input key='name'
                       placeholder="Name"
                       value={name}
                       onChange={this.handleChangedName}
                       handleKeyPress={this.handleKeyPress}/>
                <List handleChecked={this.handleChecked}/>
                <button onClick={this.add}>Add</button>
                <button onClick={this.props.close}>Cancel</button>
            </div>
        )
    }
}

GroupAddingForm.propTypes = {
    close: PropTypes.func.isRequired,
    addGroup: PropTypes.func.isRequired
};

export default connect(null, actions)(GroupAddingForm)
