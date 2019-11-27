import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as actions from '../../redux/setOfProblems/actions'
import Popup from '../common/Popup'
import SetEditingForm from './SetEditingForm'

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

    render() {
        const {id, name, canEdit, canDelete} = this.props;
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
                    <button className={'button button_inline'} onClick={this.deleteSet}>X</button>
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
    deleteSet: PropTypes.func.isRequired
};

export default connect(null, actions)(SetItem);