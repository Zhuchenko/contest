import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CustomInput from '../common/CustomInput'
import {connect} from 'react-redux'
import * as actions from '../../redux/setOfProblems/actions'
import {getSet, getProblemsForSetCreating} from '../../services/setOfProblemsApi'
import getTranslations from '../../utilities/getTranslations'
import Select from "react-select";

class SetEditingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            problems: [],
        }
    }

    componentDidMount() {
        getProblemsForSetCreating()
            .then(allProblems => {
                getSet(this.props.id)
                    .then(set => {
                        const {name, problems} = set;
                        const problemsWithSelecting = allProblems.map(problem => ({
                            ...problem,
                            isSelected: !!problems.find(p => p.id === problem.id)
                        }));
                        this.setState({
                            name,
                            problems: problemsWithSelecting
                        })
                    })
            })
    }

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

    edit = () => {
        const {id, editSet, close} = this.props;
        const {name, problems} = this.state;
        const selectedProblems = problems.filter(problem => problem.isSelected).map(problem => problem.id);

        editSet({id, newState: {name, problems: selectedProblems}});
        close();
    };

    handleKeyPress = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.edit();
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
                <Select isMulti isSearchable isClearable value={
                    problems.filter(item => item.isSelected)
                        .map(item => ({id: item.id, value: item.name, label: item.name}))
                } options={
                    problems.map(item => ({id: item.id, value: item.name, label: item.name}))
                }
                        onChange={this.handleChecked}
                        className="r-select-container r-select-container--multi"
                        classNamePrefix="r-select"
                />
                <div className={'dialog__button-panel'}>
                    <button className={'button'} onClick={this.edit}>{getTranslations({text: 'save'})}</button>
                    <button className={'button'} onClick={this.props.close}>{getTranslations({text: 'cancel'})}</button>
                </div>
            </div>
        )
    }
}

SetEditingForm.propTypes = {
    id: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    editSet: PropTypes.func.isRequired,
};

export default connect(null, actions)(SetEditingForm)