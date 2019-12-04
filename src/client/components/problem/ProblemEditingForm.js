import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CustomInput from '../common/CustomInput'
import {connect} from 'react-redux'
import {getProblem} from '../../services/problemApi'
import * as actions from '../../redux/problem/actions'
import Icon from '../common/Icon'
//import FileUploader from 'react-input-files'

const getIndex = (key) => key.substring(key.indexOf("_") + 1);

class ProblemEditingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            text: '',
            options: [],
            language: '',
            compiler: '',
            time: 0,
            memory: 0,
            // checker: '',
            // tests: [],
            // testInput: '',
            // testOutput: '',
            // testDescription: ''
        }
    }

    componentDidMount() {
        getProblem(this.props.id)
            .then(problem => {
                const {name, text, options, limitation: {time, memory}} = problem;
                this.setState({
                    name,
                    text,
                    time,
                    memory,
                    options
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

    handleChangedLanguage = ({target: {value}}) => {
        this.setState({language: value});
    };

    handleChangedCompiler = ({target: {value}}) => {
        this.setState({compiler: value});
    };

    addOption = () => {
        const {options, language, compiler} = this.state;
        this.setState({
            options: [...options, {language, compiler}],
            language: '', compiler: ''
        });
    };

    deleteOption = ({currentTarget: {id}}) => {
        const {options} = this.state;
        options.splice(getIndex(id), 1);
        this.setState({options});
    };

    handleChangedTime = ({target: {value}}) => {
        this.setState({time: value});
    };

    handleChangedMemory = ({target: {value}}) => {
        this.setState({memory: value});
    };

    // handleUploadChecker = (files) => {
    //     if (files && files[0]) {
    //         this.setState({checker: files[0]});
    //     }
    // };
    //
    // handleRemoveChecker = () => {
    //     this.setState({checker: ''});
    // };
    //
    // handleUploadTestInput = (files) => {
    //     if (files && files[0]) {
    //         this.setState({testInput: files[0]});
    //     }
    // };
    //
    // handleRemoveTestInput = () => {
    //     this.setState({testInput: ''});
    // };
    //
    // handleUploadTestOutput = (files) => {
    //     if (files && files[0]) {
    //         this.setState({testOutput: files[0]});
    //     }
    // };
    //
    // handleRemoveTestOutput = () => {
    //     this.setState({testOutput: ''});
    // };
    //
    // handleChangedTestDescription = ({target: {value}}) => {
    //     this.setState({testDescription: value});
    // };
    //
    // addTest = () => {
    //     const {tests, testInput, testOutput, testDescription} = this.state;
    //     this.setState({
    //         tests: [...tests, {input: testInput, output: testOutput, description: testDescription}],
    //         testInput: '', testOutput: '', testDescription: ''
    //     });
    // };
    //
    // deleteTest = ({target: {id}}) => {
    //     const {tests} = this.state;
    //     tests.splice(getIndex(id), 1);
    //     this.setState({tests});
    // };

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
        const {name, text, options, language, compiler, time, memory} = this.state;
        return <div className={'dialog'}>
            <CustomInput placeholder="Name"
                   value={name}
                   onChange={this.handleChangedName}
                   handleKeyPress={this.handleKeyPress}/>
            <div className={'dialog__sub-header'}>Text</div>
            <div className={'dialog__line'}>
                <textarea onChange={this.handleChangedText} value={text} rows="10" cols="75"/>
            </div>
            <div className={'dialog__sub-header'}>Options:</div>
            {
                options.length > 0 &&
                options.map((item, id) => <div className={'dialog__line'} key={id}>
                    <span>{item.language + ' - ' + item.compiler}</span>
                    <button className={'button button_borderless button_icon'} id={'option_' + id} onClick={this.deleteOption}>
                        <Icon type={'close'} className={'icon'}/>
                    </button>
                </div>)
            }
            <div className={'dialog__line'}>
                <CustomInput placeholder="language"
                       value={language}
                       onChange={this.handleChangedLanguage}
                       handleKeyPress={this.handleKeyPress}/>
                <CustomInput placeholder="compiler"
                       value={compiler}
                       onChange={this.handleChangedCompiler}
                       handleKeyPress={this.handleKeyPress}/>
                <button className={'button button_borderless button_icon'} onClick={this.addOption}>
                    <Icon type={'add'} className={'icon'}/>
                </button>
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