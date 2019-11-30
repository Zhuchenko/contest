import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../../redux/setOfProblems/actions'
import getList from '../common/List'
import Popup from '../common/Popup'
import SetAddingForm from './SetAddingForm'
import SetItem from './SetItem'

class SetList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormOpened: false
        }
    }

    componentDidMount() {
        this.props.getSets();
    }

    open = () => {
        this.setState({isFormOpened: true})
    };

    close = () => {
        this.setState({isFormOpened: false})
    };

    render() {
        const {sets, canAddSet} = this.props;
        const {isFormOpened} = this.state;
        const List = getList(SetItem, sets);
        return (
            <>
                {
                    canAddSet &&
                    <button className={'button'} onClick={this.open}>Add</button>
                }
                <List/>
                {
                    isFormOpened &&
                    <Popup>
                        <SetAddingForm close={this.close}/>
                    </Popup>
                }
            </>
        )
    }
}

SetList.propTypes = {
    sets: PropTypes.array.isRequired,
    getSets: PropTypes.func.isRequired,
    canAddSet: PropTypes.bool.isRequired,
};

export default connect(state => ({
    sets: state.setOfProblems.sets,
    canAddSet: state.application.rights.setOfProblems.add
}), actions)(SetList)