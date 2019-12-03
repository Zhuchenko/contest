import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as actions from '../../redux/setOfProblems/actions'
import Popup from '../common/Popup'
import SetEditingForm from './SetEditingForm'
import SharedRightsDialog from '../ShareRigthsDialog'

class SetItem extends Component {
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

    deleteSet = () => {
        const {id, deleteSet} = this.props;
        deleteSet({id});
    };

    edit = ({newState}) => {
        const {id, editSet} = this.props;
        editSet({newState, id});
    };

    render() {
        const {id, name, sharedReadRights, sharedWriteRights, canEdit, canDelete} = this.props;
        const {isFormOpened} = this.state;

        return (
            <div>
                <Link to={'/sets/' + id}>{name}</Link>
                {
                    canEdit &&
                    <button className={'button button_inline'} onClick={this.open}>edit</button>
                }
                {
                    canDelete &&
                    <>
                        <button className={'button button_inline'} onClick={this.deleteSet}>X</button>
                        <SharedRightsDialog {...{sharedReadRights, sharedWriteRights}} edit={this.edit}/>
                    </>
                }
                {
                    isFormOpened &&
                    <Popup>
                        <SetEditingForm id={id} close={this.close}/>
                    </Popup>
                }
            </div>
        )
    }
}

SetItem.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    canEdit: PropTypes.bool.isRequired,
    canDelete: PropTypes.bool.isRequired,
    deleteSet: PropTypes.func.isRequired,
    editSet: PropTypes.func.isRequired
};

export default connect(null, actions)(SetItem);