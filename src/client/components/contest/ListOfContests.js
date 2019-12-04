import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../../redux/contest/actions'
import getList from '../common/List'
import Popup from "../common/Popup";
import ContestAddingForm from "./ContestAddingForm";
import ContestItem from "./ContestItem";
import Icon from "../common/Icon";


class ContestList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormOpened: false
        }
    }

    componentDidMount() {
        this.props.getContests();
    }

    open = () => {
        this.setState({isFormOpened: true})
    };

    close = () => {
        this.setState({isFormOpened: false})
    };

    render() {
        const {contests, canAddContest} = this.props;
        const {isFormOpened} = this.state;
        const List = getList(ContestItem, contests);
        return (
            <>
                {
                    canAddContest &&
                    <button className={'button button_borderless button_separate button_large button_icon'} onClick={this.open}>
                        <Icon type={'add'} className={'icon'}/>
                    </button>
                }
                <List/>
                {
                    isFormOpened &&
                    <Popup>
                        <ContestAddingForm close={this.close}/>
                    </Popup>
                }
            </>
        )
    }
}

ContestList.propTypes = {
    contests: PropTypes.array.isRequired,
    getContests: PropTypes.func.isRequired,
    canAddContest: PropTypes.bool.isRequired,
};

export default connect(state => ({
    contests: state.contest.contests,
    canAddContest: state.application.rights.contest.add
}), actions)(ContestList)