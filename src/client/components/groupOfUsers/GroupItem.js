import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as actions from '../../redux/groupOfUsers/actions'
import GroupEditingForm from "./GroupEditingForm";
import Popup from "../common/Popup";

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
        const {id, name, canEdit, canDelete} = this.props;
        const {isFormOpened} = this.state;

        return (
            <div>
                <Link to={'/groups/' + id}>{name}</Link>
                {
                    canEdit &&
                    <button className={'button button_inline'} onClick={this.open}>edit</button>
                }
                {
                    canDelete &&
                    <button className={'button button_inline'} onClick={this.deleteGroup}>X</button>
                }
                {
                    isFormOpened &&
                    <Popup>
                        <GroupEditingForm id={id} close={this.close}/>
                    </Popup>
                }
            </div>
        )
    }
}

GroupItem.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    canEdit: PropTypes.bool.isRequired,
    canDelete: PropTypes.bool.isRequired,
    deleteGroup: PropTypes.func.isRequired
};

export default connect(null, actions)(GroupItem);