import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as actions from '../../redux/contest/actions'
import SharedRightsDialog from '../common/ShareRigthsDialog'
import Icon from '../common/Icon'
import Popup from "../common/Popup";
import ContestEditingForm from "./ContestEditingForm";

class ContestItem extends Component {
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

    delete = () => {
        const {id, deleteContest} = this.props;
        deleteContest({id});
    };

    edit = ({newState}) => {
        const {id, editContest} = this.props;
        editContest({newState, id});
    };

    render() {
        const {className, id, name, sharedReadRights, sharedWriteRights, canEdit, canDelete} = this.props;

        return (
            <div className={className}>
                <Link to={'/contests/' + id}>{name}</Link>
                {
                    canEdit &&
                    <button className={'button button_borderless button_icon'} onClick={this.open}>
                        <Icon type={'edit'} className={'icon'}/>
                    </button>
                }
                {
                    canDelete &&
                    <>
                        <button className={'button button_borderless button_icon'} onClick={this.delete}>
                            <Icon type={'delete'} className={'icon'}/>
                        </button>
                        <SharedRightsDialog {...{sharedReadRights, sharedWriteRights}} edit={this.edit}/>
                    </>
                }
                {
                    this.state.isFormOpened &&
                    <Popup>
                        <ContestEditingForm id={id} close={this.close}/>
                    </Popup>
                }
            </div>
        )
    }
}

ContestItem.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    canDelete: PropTypes.bool.isRequired,
    deleteContest: PropTypes.func.isRequired,
    editContest: PropTypes.func.isRequired
};

export default connect(null, actions)(ContestItem);