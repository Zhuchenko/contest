import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Input from '../common/input'
import {connect} from 'react-redux'
import * as actions from '../../redux/setOfProblems/actions'
import getList from '../common/List'
import ProblemItemWithCheckBox from './ProblemItemWithCheckBox'
import {getSet, getProblemsForSetCreating} from '../../services/setOfProblemsApi'

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
                            isSelected: problems.find(p => p.id === problem.id)
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

    handleChecked = (id) => {
        const {problems} = this.state;
        const index = problems.findIndex(problem => problem.id === id);
        problems[index].isSelected = !problems[index].isSelected;
        this.setState({problems});
    };

    edit = () => {
        const {id, editSet, close} = this.props;
        const {name, problems} = this.state;
        const selectedProblems = problems.filter(problem => problem.isSelected).map(problem => problem.id);

        editSet({id, newState: {name, problems: selectedProblems}});
        close();
    };

    render() {
        const {name, problems} = this.state;
        const List = getList(ProblemItemWithCheckBox, problems);
        return (
            <div>
                <Input key='name'
                       placeholder="Name"
                       value={name}
                       onChange={this.handleChangedName}/>
                <List handleChecked={this.handleChecked}/>
                <button onClick={this.edit}>Save</button>
                <button onClick={this.props.close}>Cancel</button>
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