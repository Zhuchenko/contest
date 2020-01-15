import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CustomInput from '../common/CustomInput'
import Select from 'react-select'
import {connect} from 'react-redux'
import * as actions from '../../redux/setOfProblems/actions'
import {getProblemsForSetCreating} from '../../services/setOfProblemsApi'
import getTranslations from '../../utilities/getTranslations'

class SetAddingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            problems: []
        }
    }

    componentDidMount() {
        getProblemsForSetCreating()
            .then((problems) => {
                const problemsWithSelecting = problems.map(problem => ({
                    ...problem,
                    isSelected: false
                }));
                this.setState({
                    name,
                    problems: problemsWithSelecting
                })
            })
    }

    add = () => {
        const {name, problems} = this.state;
        const selectedProblems = problems.filter(problem => problem.isSelected).map(problem => problem.id);
        const {addSet, close} = this.props;
        addSet({name, problems: selectedProblems});
        close();
    };

    handleChangedName = ({target: {value}}) => {
        this.setState({name: value});
    };

    handleChecked = (values) => {
        const {problems} = this.state;
        const indexes = [];
        values.forEach(value => {
            indexes.push(problems.findIndex(item => item.id === value.id));
        });
        problems.forEach(item => item.isSelected = false);
        indexes.forEach(index => problems[index].isSelected = true);
        this.setState({problems})
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
        const {name, problems} = this.state;
        return (
            <div className={'dialog dialog--fixed-width scrollbar'}>
                <CustomInput key='name'
                   placeholder={getTranslations({text: 'name'})}
                   value={name}
                   onChange={this.handleChangedName}
                   handleKeyPress={this.handleKeyPress}/>
                <Select isMulti isSearchable isClearable menuIsOpen value={
                    problems.filter(item => item.isSelected)
                        .map(item => ({id: item.id, value: item.id, label: item.name}))
                } options={
                    problems.map(item => ({id: item.id, value: item.id, label: item.name}))
                }
                    onChange={this.handleChecked}
                    className="r-select-container r-select-container--multi r-select-container--open-menu"
                    classNamePrefix="r-select"
                    placeholder={''}
                    noOptionsMessage={() => getTranslations({text: 'no options message'})}
                />
                <div className={'dialog__button-panel'}>
                    <button className={'button'} onClick={this.add}>{getTranslations({text: 'add'})}</button>
                    <button className={'button'} onClick={this.props.close}>{getTranslations({text: 'cancel'})}</button>
                </div>
            </div>
        )
    }
}

SetAddingForm.propTypes = {
    close: PropTypes.func.isRequired,
    addSet: PropTypes.func.isRequired
};

export default connect(null, actions)(SetAddingForm)
