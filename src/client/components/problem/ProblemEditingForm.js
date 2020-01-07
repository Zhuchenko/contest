import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CustomInput from '../common/CustomInput'
import {connect} from 'react-redux'
import {getProblem} from '../../services/problemApi'
import * as actions from '../../redux/problem/actions'

class ProblemEditingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            text: '',
            time: 0,
            memory: 0,
        }
    }

    componentDidMount() {
        getProblem(this.props.id)
            .then(problem => {
                const {name, text, limitation: {time, memory}} = problem;
                this.setState({
                    name,
                    text,
                    time,
                    memory
                })
            })
    }

    edit = () => {
        const { name, text, options, time, memory} = this.state;
        const {editProblem, close, id} = this.props;
        editProblem({id, newState: {name, text, options, limitation: {time, memory}}});
        close();
    };

    handleChangedName = ({target: {value}}) => {
        this.setState({name: value});
    };

    handleChangedText = ({target: {value}}) => {
        this.setState({text: value});
    };

    handleChangedTime = ({target: {value}}) => {
        this.setState({time: value});
    };

    handleChangedMemory = ({target: {value}}) => {
        this.setState({memory: value});
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
        const {name, text, time, memory} = this.state;
        return <div className={'dialog'}>
            <CustomInput placeholder="Name"
                   value={name}
                   onChange={this.handleChangedName}
                   handleKeyPress={this.handleKeyPress}/>
            <div className={'dialog__sub-header'}>Text</div>
            <div className={'dialog__line'}>
                <textarea onChange={this.handleChangedText} value={text} rows="10" cols="75"/>
            </div>
            <span className={'dialog__sub-header'}>Limitations:</span>
            <div className={'dialog__line'}>
                <span className={'dialog__line__label'}>Time: </span>
                <CustomInput type="number" placeholder={'time'} onChange={this.handleChangedTime} value={time}
                       handleKeyPress={this.handleKeyPress}/>
                <span className={'dialog__line__label'}>Memory: </span>
                <CustomInput type="number" placeholder={'memory'} onChange={this.handleChangedMemory} value={memory}
                       handleKeyPress={this.handleKeyPress}/>
            </div>
            <div className={'dialog__button-panel'}>
                <button className={'button'} onClick={this.edit}>Save</button>
                <button className={'button'} onClick={this.props.close}>Cancel</button>
            </div>
        </div>
    }
}

ProblemEditingForm.propTypes = {
    id: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    editProblem: PropTypes.func.isRequired,
};

export default connect(null, actions)(ProblemEditingForm)