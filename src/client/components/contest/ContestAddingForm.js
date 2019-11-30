import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CustomInput from '../common/CustomInput'
import {connect} from 'react-redux'
import * as actions from '../../redux/contest/actions'
import DatePicker from 'react-datepicker'
import ItemWithCheckBox from '../common/ItemWithCheckBox'
import {getGroupsForContestCreating, getSetsForContestCreating} from '../../services/contestApi'

import 'react-datepicker/dist/react-datepicker.css'
import getList from '../common/List'

const GroupItemWithCheckBox =  (props) => <ItemWithCheckBox {...props} path={'/groups/'}/>
const SetItemWithCheckBox =  (props) => <ItemWithCheckBox {...props} path={'/sets/'}/>

class ContestAddingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            groups: [],
            sets: [],
            startingDate: new Date(),
            endingDate: new Date()
        }
    }

    componentDidMount() {
        getGroupsForContestCreating()
            .then((groups) => {
                const groupsWithSelecting = groups.map(group => ({
                    ...group,
                    isSelected: false
                }));
                this.setState({
                    groups: groupsWithSelecting
                })
            });

        getSetsForContestCreating()
            .then((sets) => {
                const setsWithSelecting = sets.map(set => ({
                    ...set,
                    isSelected: false
                }));
                this.setState({
                    sets: setsWithSelecting
                })
            })
    }

    add = () => {
        const {name, groups, sets, startingDate, endingDate} = this.state;
        const selectedGroups = groups.filter(group => group.isSelected).map(group => group.id);
        const selectedSets = sets.filter(set => set.isSelected).map(set => set.id);
        const {addContest, close} = this.props;
        addContest({name, groups: selectedGroups, sets: selectedSets, startingDate, endingDate});
        close();
    };

    handleChangeStartingDate = date => {
        this.setState({startingDate: date});
    };

    handleChangeEndingDate = date => {
        this.setState({endingDate: date});
    };

    handleChangedName = ({target: {value}}) => {
        this.setState({name: value});
    };

    handleCheckedGroups = (id) => {
        const {groups} = this.state;
        const index = groups.findIndex(group => group.id === id);
        groups[index].isSelected = !groups[index].isSelected;
        this.setState({groups})
    };

    handleCheckedSets = (id) => {
        const {sets} = this.state;
        const index = sets.findIndex(set => set.id === id);
        sets[index].isSelected = !sets[index].isSelected;
        this.setState({sets})
    };

    handleKeyPress = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.add();
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            this.props.close();
        }
    };

    render() {
        const {name, groups, sets, startingDate, endingDate} = this.state;
        const GroupList = getList(GroupItemWithCheckBox, groups);
        const SetList = getList(SetItemWithCheckBox, sets);

        return (
            <div>
                <CustomInput key='name'
                             placeholder="Name"
                             value={name}
                             onChange={this.handleChangedName}
                             handleKeyPress={this.handleKeyPress}/>
                <DatePicker
                    dateFormat={"dd/MM/yyyy"}
                    selected={startingDate}
                    onChange={this.handleChangeStartingDate}
                />
                <br/>
                <DatePicker
                    dateFormat={"dd/MM/yyyy"}
                    selected={endingDate}
                    onChange={this.handleChangeEndingDate}
                />
                <div>groups</div>
                <GroupList handleChecked={this.handleCheckedGroups}/>
                <div>sets</div>
                <SetList handleChecked={this.handleCheckedSets}/>
                <button onClick={this.add}>Add</button>
                <button onClick={this.props.close}>Cancel</button>
            </div>
        )
    }
}

ContestAddingForm.propTypes = {
    close: PropTypes.func.isRequired,
    addContest: PropTypes.func.isRequired
};

export default connect(null, actions)(ContestAddingForm)
