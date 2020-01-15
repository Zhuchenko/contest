import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CustomInput from '../common/CustomInput'
import {connect} from 'react-redux'
import * as actions from '../../redux/contest/actions'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import {getGroupsForContestCreating, getSetsForContestCreating} from '../../services/contestApi'
import getTranslations from '../../utilities/getTranslations'

import 'react-datepicker/dist/react-datepicker.css'


const STARTING_DATE = new Date();


class ContestAddingForm extends Component {
    constructor(props) {
        super(props);

        STARTING_DATE.setDate(STARTING_DATE.getDate() + 1);

        this.state = {
            name: '',
            groups: [],
            sets: [],
            startingDate: STARTING_DATE,
            endingDate: STARTING_DATE
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

    handleCheckedGroups = (values) => {
        const {groups} = this.state;
        const indexes = [];
        values.forEach(value => {
            indexes.push(groups.findIndex(item => item.id === value.id));
        });
        groups.forEach(item => item.isSelected = false);
        indexes.forEach(index => groups[index].isSelected = true);
        this.setState({groups});
    };

    handleCheckedSets = (values) => {
        const {sets} = this.state;
        const indexes = [];
        values.forEach(value => {
            indexes.push(sets.findIndex(item => item.id === value.id));
        });
        sets.forEach(item => item.isSelected = false);
        indexes.forEach(index => sets[index].isSelected = true);
        this.setState({sets});
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

        return (
            <div className={'dialog dialog--fixed-width scrollbar'}>
                <div className={'dialog__line'}>
                    <CustomInput key='name'
                                 placeholder={getTranslations({text: 'name'})}
                                 value={name}
                                 onChange={this.handleChangedName}
                                 handleKeyPress={this.handleKeyPress}/>
                </div>
                <div className={'dialog__line'}>
                    <DatePicker
                        dateFormat={"dd/MM/yyyy"}
                        selected={startingDate}
                        onChange={this.handleChangeStartingDate}
                        minDate={STARTING_DATE}
                    />
                </div>
                <div className={'dialog__line'}>
                    <DatePicker
                        dateFormat={"dd/MM/yyyy"}
                        selected={endingDate.getTime() >= startingDate.getTime() ? endingDate : startingDate}
                        onChange={this.handleChangeEndingDate}
                        minDate={startingDate}
                    />
                </div>
                <div className={'dialog__line'}>
                    <div className={'dialog__column'}>
                        <span className={'dialog__line__label'}>{getTranslations({text: 'groups'})}: </span>
                        <Select isMulti isSearchable isClearable menuIsOpen value={
                            groups.filter(item => item.isSelected)
                                .map((item) => ({id: item.id, value: item.id, label: item.name}))
                        } options={
                            groups.map(item => ({id: item.id, value: item.id, label: item.name}))
                        }
                            onChange={this.handleCheckedGroups}
                            className="r-select-container r-select-container--multi r-select-container--open-menu"
                            classNamePrefix="r-select"
                            placeholder={''}
                            noOptionsMessage={() => getTranslations({text: 'no options message'})}
                        />
                    </div>
                </div>
                <div className={'dialog__line'}>
                    <div className={'dialog__column'}>
                        <span className={'dialog__line__label'}>{getTranslations({text: 'sets'})}: </span>
                        <Select isMulti isSearchable isClearable menuIsOpen value={
                            sets.filter(item => item.isSelected)
                                .map((item) => ({id: item.id, value: item.id, label: item.name}))
                        } options={
                            sets.map(item => ({id: item.id, value: item.id, label: item.name}))
                        }
                            onChange={this.handleCheckedSets}
                            className="r-select-container r-select-container--multi r-select-container--open-menu"
                            classNamePrefix="r-select"
                            placeholder={''}
                            noOptionsMessage={() => getTranslations({text: 'no options message'})}
                        />
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

ContestAddingForm.propTypes = {
    close: PropTypes.func.isRequired,
    addContest: PropTypes.func.isRequired
};

export default connect(null, actions)(ContestAddingForm)
