import React, {Component} from 'react'
import PropTypes from "prop-types";
import Input from "../common/Input";
import {connect} from "react-redux";
import * as actions from "../../redux/groupOfUsers/actions";
import getList from "../common/List";
import UserItemWithCheckBox from "./UserItemWithCheckBox";
import {getGroup, getUsersForGroupCreating} from "../../services/groupOfUsersApi";

//import './css/user.css';

class EditingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            users: [],
        }
    }

    componentDidMount() {
        getUsersForGroupCreating()
            .then(allUsers => {
                getGroup(this.props.id)
                    .then(group => {
                        const {name, users} = group;
                        const usersWithSelecting = allUsers.map(user => ({
                            ...user,
                            isSelected: users.find(u => u._id === user._id)
                        }));
                        this.setState({
                            name,
                            users: usersWithSelecting
                        })
                    })
            })
    }

    handleChangedName = ({target: {value}}) => {
        this.setState({name: value});
    };

    handleChecked = (id) => {
        const {users} = this.state;
        const index = users.findIndex(user => user._id === id);
        users[index].isSelected = !users[index].isSelected;
        this.setState({users});
    };

    edit = () => {
        const {id, editGroup, close} = this.props;
        const {name, users} = this.state;
        const selectedUsers = users.filter(user => user.isSelected).map(user => user._id);
        editGroup({id, newState: {name, users: selectedUsers}});
        close();
    };

    render() {
        const {name, users} = this.state;
        const List = getList(UserItemWithCheckBox, users);
        return (
            <div>
                <Input key='name'
                       placeholder="Name"
                       value={name}
                       onChange={this.handleChangedName}/>
                <List handleChecked={this.handleChecked}/>
                <button onClick={this.edit}>Save</button>
                <button onClick={this.props.close}>Cancel</button>
            </div>
        )
    }
}

EditingForm.propTypes = {
    id: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    editGroup: PropTypes.func.isRequired,
};

export default connect(null, actions)(EditingForm)