import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as actions from '../../redux/contest/actions'

class ContestItem extends Component {
    delete = () => {
        const {id, deleteContest} = this.props;
        deleteContest({id});
    };

    render() {
        const {id, name, canDelete} = this.props;

        return (
            <div>
                <Link to={'/contests/' + id}>{name}</Link>
                {
                    canDelete &&
                    <button className={'button button_inline'} onClick={this.deleteGroup}>X</button>
                }
            </div>
        )
    }
}

ContestItem.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    canDelete: PropTypes.bool.isRequired,
    deleteContest: PropTypes.func.isRequired
};

export default connect(null, actions)(ContestItem);