import React, {Component} from 'react'
import UserItem from './UserItem'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../../redux/user/actions'
import getList from '../common/List'

//import './css/list.css'

class UserList extends Component {
    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        const {users} = this.props;
        const List = getList(UserItem, users);
        return (
            <List/>
        )
    }
}

UserList.propTypes = {
    users: PropTypes.array.isRequired,
    getUsers: PropTypes.func.isRequired,
};

export default connect(state => ({
    users: state.user.users
}), actions)(UserList)