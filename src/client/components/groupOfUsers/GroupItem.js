import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as actions from '../../redux/groupOfUsers/actions'
import GroupEditingForm from './GroupEditingForm'
import Popup from '../common/Popup'
import SharedRightsDialog from '../ShareRigthsDialog'
import Icon from '../common/Icon'

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

    edit = ({newState}) => {
        const {id, editGroup} = this.props;
        editGroup({newState, id});
    };

    render() {
        const {id, name, sharedReadRights, sharedWriteRights, canEdit, canDelete} = this.props;
        const {isFormOpened} = this.state;

        return (
            <div>
                <Link to={'/groups/' + id}>{name}</Link>
                {
                    canEdit &&
                    <button className={'button button_inline'} onClick={this.open}>
                        <Icon type={'edit'} className={'icon'}/>
                    </button>
                }
                {
                    canDelete &&
                    <>
                        <button className={'button button_inline'} onClick={this.deleteGroup}>
                            <Icon type={'close'} className={'icon'}/>
                        </button>
                        <SharedRightsDialog {...{sharedReadRights, sharedWriteRights}} edit={this.edit}/>
                    </>
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
    deleteGroup: PropTypes.func.isRequired,
    editGroup: PropTypes.func.isRequired
};

export default connect(null, actions)(GroupItem);