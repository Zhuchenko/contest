import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as actions from '../../redux/user/actions'
import EditingForm from "./EditingForm";
import Popup from "../common/popup";

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
    }

    close = () => {
        this.setState({isFormOpened: false})
    }

    deleteUser = () => {
        const {id, deleteUser} = this.props;
        deleteUser({id});
    };

    render() {
        const {id, name, lastName, unverified, canDeleteUser} = this.props;
        const {isFormOpened} = this.state;

        return (
            <div>
                {
                    unverified ?
                        <span>{lastName + ' ' + name}</span>
                        :
                        <Link to={'/users/' + id}>{lastName + ' ' + name}</Link>
                }
                <Link to={'/users/' + id}>{unverified}</Link>
                <button onClick={this.open}>edit</button>
                {
                    isFormOpened &&
                    <Popup>
                        <EditingForm id={id} unverified={unverified} close={this.close}/>
                    </Popup>
                }
                {
                    //canDeleteUser &&
                    <button onClick={this.deleteUser}>X</button>
                }
            </div>
        )
    }
}

UserItem.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    //canDeleteUser: PropTypes.bool.isRequired,
    deleteUser: PropTypes.func.isRequired,
    unverified: PropTypes.bool
};

export default connect((state) => ({
    //canDeleteUser: state.application.rights.user.delete
}), actions)(UserItem);