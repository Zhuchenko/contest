import React, {Component} from 'react'
import UserItem from './UserItem'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../../redux/user/actions'
import getList from '../common/List'
import Popup from "../common/popup";
import AddingForm from "./AddingForm";

//import './css/list.css'

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormOpened: false
        }
    }

    componentDidMount() {
        this.props.getUsers();
    }

    open = () => {
        this.setState({isFormOpened: true})
    };

    close = () => {
        this.setState({isFormOpened: false})
    };

    render() {
        const {users, canAddUser} = this.props;
        const {isFormOpened} = this.state;
        const List = getList(UserItem, users);
        return (
            <>
                {
                    canAddUser &&
                    <button onClick={this.open}>Add</button>
                }
                <List/>
                {
                    isFormOpened &&
                    <Popup>
                        <AddingForm close={this.close}/>
                    </Popup>
                }
            </>
        )
    }
}

UserList.propTypes = {
    users: PropTypes.array.isRequired,
    getUsers: PropTypes.func.isRequired,
    canAddUser: PropTypes.bool.isRequired,
};

export default connect(state => ({
    users: state.user.users,
    canAddUser: state.application.rights.user.edit
}), actions)(UserList)