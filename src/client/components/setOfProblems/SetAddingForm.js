import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CustomInput from '../common/CustomInput'
import {connect} from 'react-redux'
import * as actions from '../../redux/setOfProblems/actions'
import getList from '../common/List'
import ProblemItemWithCheckBox from './ProblemItemWithCheckBox'
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

    handleChecked = (id) => {
        const {problems} = this.state;
        const index = problems.findIndex(problem => problem.id === id);
        problems[index].isSelected = !problems[index].isSelected;
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
        const List = getList(ProblemItemWithCheckBox, problems);
        return (
            <div className={'dialog'}>
                <CustomInput key='name'
                       placeholder={getTranslations({text: 'name'})}
                       value={name}
                       onChange={this.handleChangedName}
                       handleKeyPress={this.handleKeyPress}/>
                <List handleChecked={this.handleChecked}/>
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
