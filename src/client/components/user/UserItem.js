import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as actions from '../../redux/user/actions'
import UserEditingForm from './UserEditingForm'
import Popup from "../common/Popup";

//import './css/item.css'

class UserItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormOpened: false
        }
    }

    open = () => {
        this.setState({isFormOpened: true})
    };

    close = () => {
        this.setState({isFormOpened: false})
    };

    deleteUser = () => {
        const {id, deleteUser, unverified} = this.props;
        deleteUser({id, unverified});
    };

    render() {
        const {id, name, lastName, unverified, canEditUser, canDeleteUser} = this.props;
        const {isFormOpened} = this.state;

        return <div>
            {
                unverified ?
                    <span>{lastName + ' ' + name}</span>
                    :
                    <Link to={'/users/' + id}>{lastName + ' ' + name}</Link>
            }
            {
                canEditUser &&
                <button onClick={this.open}>edit</button>
            }
            {
                canDeleteUser &&
                <button onClick={this.deleteUser}>X</button>
            }
            {
                isFormOpened &&
                <Popup>
                    <UserEditingForm id={id} unverified={unverified} close={this.close}/>
                </Popup>
            }
        </div>
    }
}

UserItem.propTypes = {
    name: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    canEditUser: PropTypes.bool.isRequired,
    canDeleteUser: PropTypes.bool.isRequired,
    deleteUser: PropTypes.func.isRequired,
    unverified: PropTypes.bool
};

export default connect((state) => ({
    canEditUser: state.application.rights.user.edit,
    canDeleteUser: state.application.rights.user.delete
}), actions)(UserItem);