import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as actions from '../../redux/contest/actions'
import SharedRightsDialog from '../ShareRigthsDialog'
import Icon from '../common/Icon'

class ContestItem extends Component {
    delete = () => {
        const {id, deleteContest} = this.props;
        deleteContest({id});
    };

    edit = ({newState}) => {
        const {id, editContest} = this.props;
        editContest({newState, id});
    };
    render() {
        const {id, name, sharedReadRights, sharedWriteRights, canDelete} = this.props;

        return (
            <div>
                <Link to={'/contests/' + id}>{name}</Link>
                {
                    canDelete &&
                    <>
                        <button className={'button button_inline'} onClick={this.delete}>
                            <Icon type={'close'} className={'icon'}/>
                        </button>
                        <SharedRightsDialog {...{sharedReadRights, sharedWriteRights}} edit={this.edit}/>
                    </>
                }
            </div>
        )
    }
}

ContestItem.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    canDelete: PropTypes.bool.isRequired,
    deleteContest: PropTypes.func.isRequired,
    editContest: PropTypes.func.isRequired
};

export default connect(null, actions)(ContestItem);