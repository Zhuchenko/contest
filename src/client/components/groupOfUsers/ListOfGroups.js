import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../../redux/groupOfUsers/actions'
import getList from '../common/List'
import Popup from "../common/Popup";
import GroupAddingForm from "./GroupAddingForm";
import GroupItem from "./GroupItem";
import Icon from "../common/Icon";

//import './css/list.css'

class GroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormOpened: false
        }
    }

    componentDidMount() {
        this.props.getGroups();
    }

    open = () => {
        this.setState({isFormOpened: true})
    };

    close = () => {
        this.setState({isFormOpened: false})
    };

    render() {
        const {groups, canAddGroup} = this.props;
        const {isFormOpened} = this.state;
        const List = getList(GroupItem, groups);
        return (
            <>
                {
                    canAddGroup &&
                    <button className={'button button_borderless button_separate button_large button_icon'} onClick={this.open}>
                        <Icon type={'add'} className={'icon'}/>
                    </button>
                }
                <List/>
                {
                    isFormOpened &&
                    <Popup>
                        <GroupAddingForm close={this.close}/>
                    </Popup>
                }
            </>
        )
    }
}

GroupList.propTypes = {
    groups: PropTypes.array.isRequired,
    getGroups: PropTypes.func.isRequired,
    canAddGroup: PropTypes.bool.isRequired,
};

export default connect(state => ({
    groups: state.groupOfUsers.groups,
    canAddGroup: state.application.rights.groupOfUsers.add
}), actions)(GroupList)