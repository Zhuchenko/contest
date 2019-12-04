import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as actions from '../../redux/problem/actions'
import ProblemEditingForm from './ProblemEditingForm'
import Popup from '../common/Popup'
import SharedRightsDialog from '../ShareRigthsDialog'
import Icon from "../common/Icon";

class ProblemItem extends Component {
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

    deleteProblem = () => {
        const {id, deleteProblem} = this.props;
        deleteProblem({id});
    };

    edit = ({newState}) => {
        const {id, editProblem} = this.props;
        editProblem({newState, id});
    };

    render() {
        const {id, name, sharedReadRights, sharedWriteRights, canEdit, canDelete} = this.props;
        const {isFormOpened} = this.state;

        return (
            <div>
                <Link to={'/problems/' + id}>{name}</Link>
                {
                    canEdit &&
                    <button className={'button button_inline'} onClick={this.open}>
                        <Icon type={'edit'} className={'icon'}/>
                    </button>
                }
                {
                    canDelete &&
                    <>
                        <button className={'button button_inline'} onClick={this.deleteProblem}>
                            <Icon type={'close'} className={'icon'}/>
                        </button>
                        <SharedRightsDialog {...{sharedReadRights, sharedWriteRights}} edit={this.edit}/>
                    </>
                }
                {
                    isFormOpened &&
                    <Popup>
                        <ProblemEditingForm id={id} close={this.close}/>
                    </Popup>
                }
            </div>
        )
    }
}

ProblemItem.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    canEdit: PropTypes.bool.isRequired,
    canDelete: PropTypes.bool.isRequired,
    deleteProblem: PropTypes.func.isRequired,
    editProblem: PropTypes.func.isRequired,
};

export default connect(null, actions)(ProblemItem);