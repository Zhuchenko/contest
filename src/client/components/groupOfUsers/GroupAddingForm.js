import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CustomInput from '../common/CustomInput'
import {connect} from 'react-redux'
import * as actions from '../../redux/groupOfUsers/actions'
import getList from '../common/List'
import UserItemWithCheckBox from './UserItemWithCheckBox'
import {getUsersForGroupCreating} from '../../services/groupOfUsersApi'
import getTranslations from '../../utilities/getTranslations'
import Select from "react-select";

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
        return (
            <div className={'dialog dialog--fixed-width scrollbar'}>
                <CustomInput key='name'
                             placeholder={getTranslations({text: 'name'})}
                             value={name}
                             onChange={this.handleChangedName}
                             handleKeyPress={this.handleKeyPress}/>
                <Select isMulti isSearchable isClearable menuIsOpen value={
                    users.filter(item => item.isSelected)
                        .map(item => ({id: item.id, value: item.id, label: item.name + ' ' + item.lastName}))
                } options={
                    users.map(item => ({id: item.id, value: item.id, label: item.name + ' ' + item.lastName}))
                }
                        onChange={this.handleChecked}
                        className="r-select-container r-select-container--multi r-select-container--open-menu"
                        classNamePrefix="r-select"
                />
                <div className={'dialog__button-panel'}>
                    <button className={'button'} onClick={this.add}>{getTranslations({text: 'add'})}</button>
                    <button className={'button'} onClick={this.props.close}>{getTranslations({text: 'cancel'})}</button>
                </div>
            </div>
        )
    }
}

GroupAddingForm.propTypes = {
    close: PropTypes.func.isRequired,
    addGroup: PropTypes.func.isRequired
};

export default connect(null, actions)(GroupAddingForm)
