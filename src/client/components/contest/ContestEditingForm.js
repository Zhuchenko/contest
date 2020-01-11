import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CustomInput from '../common/CustomInput'
import {connect} from 'react-redux'
import * as actions from '../../redux/contest/actions'
import ItemWithCheckBox from '../common/ItemWithCheckBox'
import {getContest, getGroupsForContestCreating, getSetsForContestCreating} from '../../services/contestApi'
import getList from '../common/List'
import getTranslations from '../../utilities/getTranslations'

const GroupItemWithCheckBox =  (props) => <ItemWithCheckBox {...props} path={'/groups/'}/>;
const SetItemWithCheckBox =  (props) => <ItemWithCheckBox {...props} path={'/sets/'}/>;


class ContestEditingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            groups: [],
            sets: []
        }
    }

    componentDidMount() {
        (async () => {
            const contest =  await getContest(this.props.id);
            const groups =  await getGroupsForContestCreating();
            const sets =  await getSetsForContestCreating();

            const groupsWithSelecting = groups.map(group => ({
                ...group,
                isSelected: contest.groups.find(g => g.id === group.id)
            }));

            const setsWithSelecting = sets.map(set => ({
                ...set,
                isSelected: contest.sets.find(s => s.id === set.id)
            }));

            this.setState({
                name: contest.name,
                groups: groupsWithSelecting,
                sets: setsWithSelecting
            })
        })();
    }

    edit = () => {
        const {name, groups, sets} = this.state;
        const selectedGroups = groups.filter(group => group.isSelected).map(group => group.id);
        const selectedSets = sets.filter(set => set.isSelected).map(set => set.id);
        const {editContest, close} = this.props;
        editContest({name, groups: selectedGroups, sets: selectedSets});
        close();
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
        const {name, groups, sets} = this.state;
        const GroupList = getList(GroupItemWithCheckBox, groups);
        const SetList = getList(SetItemWithCheckBox, sets);

        return (
            <div className={'dialog scrollbar'}>
                <div className={'dialog__line'}>
                    <CustomInput
                                 placeholder={getTranslations({text: 'name'})}
                                 value={name}
                                 onChange={this.handleChangedName}
                                 handleKeyPress={this.handleKeyPress}/>
                </div>
                <div className={'dialog__line'}>
                    <div className={'dialog__line__list'}>
                        <span className={'dialog__line__label'}>{getTranslations({text: 'groups'})}: </span>
                        <GroupList handleChecked={this.handleCheckedGroups}/>
                    </div>
                </div>
                <div className={'dialog__line'}>
                    <div className={'dialog__line__list'}>
                        <span className={'dialog__line__label'}>{getTranslations({text: 'sets'})}: </span>
                        <SetList handleChecked={this.handleCheckedSets}/>
                    </div>
                </div>
                <div className={'dialog__button-panel'}>
                    <button className={'button'} onClick={this.add}>{getTranslations({text: 'add'})}</button>
                    <button className={'button'} onClick={this.props.close}>{getTranslations({text: 'cancel'})}</button>
                </div>
            </div>
        )
    }
}

ContestEditingForm.propTypes = {
    close: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};

export default connect(null, actions)(ContestEditingForm)
