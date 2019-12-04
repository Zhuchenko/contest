import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CustomInput from '../common/CustomInput'
import {connect} from 'react-redux'
import * as actions from '../../redux/problem/actions'
import FileUploader from 'react-input-files'
import Icon from '../common/Icon'

const getIndex = (key) => key.substring(key.indexOf("_") + 1);

class ProblemAddingForm extends Component {
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
            checker: '',
            tests: [],
            testInput: '',
            testOutput: '',
            testDescription: ''
        }
    }

    add = () => {
        const {name, text, options, time, memory, checker, tests} = this.state;
        const {addProblem, close} = this.props;
        addProblem({problem: {name, text, options, limitation: {time, memory}}, checker, tests});
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

    handleUploadChecker = (files) => {
        if (files && files[0]) {
            this.setState({checker: files[0]});
        }
    };

    handleRemoveChecker = () => {
        this.setState({checker: ''});
    };

    handleUploadTestInput = (files) => {
        if (files && files[0]) {
            this.setState({testInput: files[0]});
        }
    };

    handleRemoveTestInput = () => {
        this.setState({testInput: ''});
    };

    handleUploadTestOutput = (files) => {
        if (files && files[0]) {
            this.setState({testOutput: files[0]});
        }
    };

    handleRemoveTestOutput = () => {
        this.setState({testOutput: ''});
    };

    handleChangedTestDescription = ({target: {value}}) => {
        this.setState({testDescription: value});
    };

    addTest = () => {
        const {tests, testInput, testOutput, testDescription} = this.state;
        this.setState({
            tests: [...tests, {input: testInput, output: testOutput, description: testDescription}],
            testInput: '', testOutput: '', testDescription: ''
        });
    };

    deleteTest = ({currentTarget: {id}}) => {
        const {tests} = this.state;
        tests.splice(getIndex(id), 1);
        this.setState({tests});
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
        const {
            name, text, options, language, compiler, time, memory, checker,
            tests, testInput, testOutput, testDescription
        } = this.state;
        return <div className={'dialog scrollbar'}>
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
                    <button className={'button button_inline button_icon'} id={'option_' + id} onClick={this.deleteOption}>
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
                <button className={'button button_inline button_icon'} onClick={this.addOption}>
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
            <div className={'dialog__line'}>
                <span>Checker: </span>
                <FileUploader accept={'.cs, .cpp'} onChange={this.handleUploadChecker}>
                    <button className={'button button_inline button_icon'}>
                        <Icon type={'file'} className={'icon'}/>
                    </button>
                </FileUploader>
                {
                    checker &&
                    <>
                        <span>{checker.name}</span>
                        <button className={'button button_inline button_icon'} onClick={this.handleRemoveChecker}>
                            <Icon type={'close'} className={'icon'}/>
                        </button>
                    </>
                }
            </div>
            <div className={'dialog__sub-header'}>Tests:</div>
            {
                //TODO: add check for not loaded files ('undefined-undefined' case)
                tests.length > 0 &&
                tests.map((item, id) => <div className={'dialog__line'} key={id}>
                    <span>{item.description + ' ( ' + item.input.name + ' - ' + item.output.name + ' )'}</span>
                    <button className={'button button_inline button_icon'} key={'test_' + id} onClick={this.deleteTest}>
                        <Icon type={'close'} className={'icon'}/>
                    </button>
                </div>)
            }
            <div className={'dialog__line'}>
                <FileUploader accept={'.txt'} onChange={this.handleUploadTestInput}>
                    <div className={'dialog__line'}>
                        <span className={'dialog__line__label'}>Input: </span>
                        <button className={'button button_inline button_icon'}>
                            <Icon type={'file'} className={'icon'}/>
                        </button>
                    </div>
                </FileUploader>
                {
                    testInput &&
                    <>
                        <span className={'dialog__line__label'}>{testInput.name}</span>
                        <button className={'button button_inline button_icon'} onClick={this.handleRemoveTestInput}>
                            <Icon type={'close'} className={'icon'}/>
                        </button>
                    </>
                }
                <FileUploader accept={'.txt'} onChange={this.handleUploadTestOutput}>
                    <div className={'dialog__line'}>
                        <span className={'dialog__line__label'}>Output: </span>
                        <button className={'button button_inline button_icon'}>
                            <Icon type={'file'} className={'icon'}/>
                        </button>
                    </div>
                </FileUploader>
                {
                    testOutput &&
                    <>
                        <span className={'dialog__line__label'}>{testOutput.name}</span>
                        <button className={'button button_inline button_icon'} onClick={this.handleRemoveTestOutput}>
                            <Icon type={'close'} className={'icon'}/>
                        </button>
                    </>
                }
            </div>
            <div className={'dialog__line'}>
                <CustomInput placeholder="test-description"
                       value={testDescription}
                       onChange={this.handleChangedTestDescription}
                       handleKeyPress={this.handleKeyPress}/>
                <button className={'button button_inline button_icon'} onClick={this.addTest}>
                    <Icon type={'add'} className={'icon'}/>
                </button>
            </div>
            <div className={'dialog__button-panel'}>
                <button className={'button'} onClick={this.add}>Add</button>
                <button className={'button'} onClick={this.props.close}>Cancel</button>
            </div>
        </div>
    }
}

ProblemAddingForm.propTypes = {
    close: PropTypes.func.isRequired,
    addProblem: PropTypes.func.isRequired
};

export default connect(null, actions)(ProblemAddingForm)
