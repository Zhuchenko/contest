import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as actions from '../../redux/groupOfUsers/actions'
import EditingForm from "./EditingForm";
import Popup from "../common/popup";

//import './css/item.css'

class GroupItem extends Component {
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

    deleteGroup = () => {
        const {id, deleteGroup} = this.props;
        deleteGroup({id});
    };

    render() {
        const {id, name, canEditGroup, canDeleteGroup} = this.props;
        const {isFormOpened} = this.state;

        return (
            <div>
                <Link to={'/groups/' + id}>{name}</Link>
                {
                    canEditGroup &&
                    <button onClick={this.open}>edit</button>
                }
                {
                    canDeleteGroup &&
                    <button onClick={this.deleteGroup}>X</button>
                }
                {
                    isFormOpened &&
                    <Popup>
                        <EditingForm id={id} close={this.close}/>
                    </Popup>
                }
            </div>
        )
    }
}

GroupItem.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    canEditGroup: PropTypes.bool.isRequired,
    canDeleteGroup: PropTypes.bool.isRequired,
    deleteGroup: PropTypes.func.isRequired
};

export default connect((state) => ({
    canEditGroup: state.application.rights.groupOfUsers.create,
    canDeleteGroup: state.application.rights.groupOfUsers.delete
}), actions)(GroupItem);