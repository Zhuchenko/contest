import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../../redux/problem/actions'
import getList from '../common/List'
import Popup from "../common/Popup";
import ProblemAddingForm from "./ProblemAddingForm";
import ProblemItem from "./ProblemItem";
import Icon from "../common/Icon";

//import './css/list.css'

class ProblemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormOpened: false
        }
    }

    componentDidMount() {
        this.props.getProblems();
    }

    open = () => {
        this.setState({isFormOpened: true})
    };

    close = () => {
        this.setState({isFormOpened: false})
    };

    render() {
        const {problems, canAddProblem} = this.props;
        const {isFormOpened} = this.state;
        const List = getList(ProblemItem, problems);
        return (
            <>
                {
                    canAddProblem &&
                    <button className={'button button_borderless button_separate button_large button_icon'} onClick={this.open}>
                        <Icon type={'add'} className={'icon'}/>
                    </button>
                }
                <List/>
                {
                    isFormOpened &&
                    <Popup>
                        <ProblemAddingForm close={this.close}/>
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
};

export default connect(state => ({
    problems: state.problem.problems,
    canAddProblem: state.application.rights.problem.add
}), actions)(ProblemList)