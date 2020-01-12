import React, {Component} from 'react'
import PropTypes from "prop-types";
import CustomInput from "../common/CustomInput";
import {connect} from "react-redux";
import * as actions from "../../redux/groupOfUsers/actions";
import getList from "../common/List";
import UserItemWithCheckBox from "./UserItemWithCheckBox";
import {getGroup, getUsersForGroupCreating} from "../../services/groupOfUsersApi";
import getTranslations from '../../utilities/getTranslations'
import Select from "react-select";

class GroupEditingForm extends Component {
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
                            isSelected: users.find(u => u.id === user.id)
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

    handleChecked = (values) => {
        const {users} = this.state;
        const indexes = [];
        values.forEach(value => {
            indexes.push(users.findIndex(item => item.id === value.id));
        });
        users.forEach(item => item.isSelected = false);
        indexes.forEach(index => users[index].isSelected = true);
        this.setState({users})
    };

    edit = () => {
        const {id, editGroup, close} = this.props;
        const {name, users} = this.state;
        const selectedUsers = users.filter(user => user.isSelected).map(user => user.id);
        editGroup({id, newState: {name, users: selectedUsers}});
        close();
    };

    handleKeyPress = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.edit();
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            this.props.close();
        }
    };

    render() {
        const {name, users} = this.state;
        return (
            <div className={'dialog dialog--fixed-width scrollbar'}>
                <CustomInput key='name'
                             placeholder={getTranslations({text: 'name'})}
                             value={name}
                             onChange={this.handleChangedName}
                             handleKeyPress={this.handleKeyPress}
                />
                <Select isMulti isSearchable isClearable value={
                    users.filter(item => item.isSelected)
                        .map(item => ({id: item.id, value: item.name, label: item.name}))
                } options={
                    users.map(item => ({id: item.id, value: item.name, label: item.name}))
                }
                        onChange={this.handleChecked}
                        className="r-select-container r-select-container--multi"
                        classNamePrefix="r-select"
                />
                <div className={'dialog__button-panel'}>
                    <button className={'button'} onClick={this.edit}>{getTranslations({text: 'save'})}</button>
                    <button className={'button'} onClick={this.props.close}>{getTranslations({text: 'cancel'})}</button>
                </div>
            </div>
        )
    }
}

GroupEditingForm.propTypes = {
    id: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    editGroup: PropTypes.func.isRequired,
};

export default connect(null, actions)(GroupEditingForm)