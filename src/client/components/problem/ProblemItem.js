import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as actions from '../../redux/problem/actions'
import ProblemEditingForm from "./ProblemEditingForm";
import Popup from "../common/Popup";

//import './css/item.css'

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

    render() {
        const {id, name, canEdit, canDelete} = this.props;
        const {isFormOpened} = this.state;

        return (
            <div>
                <Link to={'/problems/' + id}>{name}</Link>
                {
                    canEdit &&
                    <button onClick={this.open}>edit</button>
                }
                {
                    canDelete &&
                    <button onClick={this.deleteProblem}>X</button>
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
    deleteProblem: PropTypes.func.isRequired
};

export default connect(null, actions)(ProblemItem);