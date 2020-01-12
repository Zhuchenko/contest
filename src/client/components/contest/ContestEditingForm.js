import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CustomInput from '../common/CustomInput'
import {connect} from 'react-redux'
import * as actions from '../../redux/contest/actions'
import Select from 'react-select'
import {getContest, getGroupsForContestCreating, getSetsForContestCreating} from '../../services/contestApi'
import getTranslations from '../../utilities/getTranslations'

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
            const groups =  await getGroupsForContestCreating(this.props.id);
            const sets =  await getSetsForContestCreating(this.props.id);

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
        const {editContest, id, close} = this.props;
        editContest({id, newState: {name, groups: selectedGroups, sets: selectedSets}});
        close();
    };

    handleChangedName = ({target: {value}}) => {
        this.setState({name: value});
    };

    handleCheckedGroups = (values) => {
        const {groups} = this.state;
        const indexes = [];
        values.forEach(value => {
            indexes.push(groups.findIndex(item => item.id === value.id));
        });
        groups.forEach(item => item.isSelected = false);
        indexes.forEach(index => groups[index].isSelected = true);
        this.setState({groups})
    };

    handleCheckedSets = (values) => {
        const {sets} = this.state;
        const indexes = [];
        values.forEach(value => {
            indexes.push(sets.findIndex(item => item.id === value.id));
        });
        sets.forEach(item => item.isSelected = false);
        indexes.forEach(index => sets[index].isSelected = true);
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

        return (
            <div className={'dialog dialog--fixed-width scrollbar'}>
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
                        <Select isMulti isSearchable value={
                            groups.filter(item => item.isSelected)
                                .map((item) => ({id: item.id, value: item.name, label: item.name}))
                        } options={
                            groups.map(item => ({id: item.id, value: item.name, label: item.name}))
                        }
                                onChange={this.handleCheckedGroups}
                                className="r-select-container r-select-container--multi"
                                classNamePrefix="r-select"
                        />
                    </div>
                </div>
                <div className={'dialog__line'}>
                    <div className={'dialog__line__list'}>
                        <span className={'dialog__line__label'}>{getTranslations({text: 'sets'})}: </span>
                        <Select isMulti isSearchable value={
                            sets.filter(item => item.isSelected)
                                .map((item) => ({id: item.id, value: item.name, label: item.name}))
                        } options={
                            sets.map(item => ({id: item.id, value: item.name, label: item.name}))
                        }
                                onChange={this.handleCheckedSets}
                                className="r-select-container r-select-container--multi"
                                classNamePrefix="r-select"
                        />
                    </div>
                </div>
                <div className={'dialog__button-panel'}>
                    <button className={'button'} onClick={this.edit}>{getTranslations({text: 'edit'})}</button>
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
