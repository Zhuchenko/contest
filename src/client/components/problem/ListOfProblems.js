import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../../redux/problem/actions'
import getList from '../common/List'
import Popup from "../common/Popup";
import ProblemAddingForm from "./ProblemAddingForm";
import ProblemItem from "./ProblemItem";
import Icon from "../common/Icon";

class ProblemList extends Component {
    componentDidMount() {
        this.props.getProblems();
    }

    render() {
        const {problems, canAddProblem, creatingDialogIsOpen, openProblemCreatingDialog} = this.props;
        const List = getList(ProblemItem, problems);
        return (
            <>
                {
                    canAddProblem &&
                    <button className={'button button_borderless button_separate button_large button_icon'} onClick={openProblemCreatingDialog}>
                        <Icon type={'add'} className={'icon'}/>
                    </button>
                }
                <List/>
                {
                    creatingDialogIsOpen &&
                    <Popup>
                        <ProblemAddingForm/>
                    </Popup>
                }
            </>
        )
    }
}

ProblemList.propTypes = {
    problems: PropTypes.array.isRequired,
    getProblems: PropTypes.func.isRequired,
    canAddProblem: PropTypes.bool.isRequired,
    creatingDialogIsOpen: PropTypes.bool.isRequired,
    openProblemCreatingDialog: PropTypes.func.isRequired,
};

export default connect(state => ({
    problems: state.problem.problems,
    canAddProblem: state.application.rights.problem.add,
    creatingDialogIsOpen: state.problem.creatingDialogIsOpen
}), actions)(ProblemList)