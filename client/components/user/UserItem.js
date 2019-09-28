import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as actions from '../../redux/user/actions'

//import './css/item.css'

class UserItem extends Component {

    deleteUser = () => {
        const {id, deleteUser} = this.props;
        deleteUser({id});
    };

    render() {
        const {id, name, lastName} = this.props;

        return (
            <div>
                <Link to={'/users/' + id}>{lastName + ' ' + name}</Link>
                <button onClick={this.deleteUser}>X</button>
            </div>
        )
    }
}

UserItem.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    canDeleteUser: PropTypes.bool.isRequired,
    deleteUser: PropTypes.func.isRequired
};

export default connect((state) => ({
    canDeleteUser: state.application.rights.user.delete
}), actions)(UserItem);