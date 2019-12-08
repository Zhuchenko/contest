import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CustomInput from '../common/CustomInput'
import {connect} from 'react-redux'
import * as actions from '../../redux/problem/actions'
import FileUploader from 'react-input-files'
import Icon from '../common/Icon'
import getTranslations from '../../utilities/getTranslations'

const getIndex = (key) => key.substring(key.indexOf("_") + 1);

class ProblemAddingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            text: '',
            time: 0,
            memory: 0,
            checker: '',
            generator: '',
            tests: [],
            testInput: '',
            testOutput: '',
            testDescription: ''
        }
    }

    add = () => {
        const {name, text, time, memory, checker, generator, tests} = this.state;
        const {addProblem, close} = this.props;
        addProblem({problem: {name, text, limitation: {time, memory}}, checker, generator, tests});
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

    handleUploadChecker = (files) => {
        if (files && files[0]) {
            this.setState({checker: files[0]});
        }
    };

    handleRemoveChecker = () => {
        this.setState({checker: ''});
    };

    handleUploadGenerator = (files) => {
        if (files && files[0]) {
            this.setState({generator: files[0]});
        }
    };

    handleRemoveGenerator = () => {
        this.setState({generator: ''});
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
        const {name, text, time, memory, checker, generator, tests, testInput, testOutput, testDescription} = this.state;
        const {isCreating, error, closeProblemCreatingDialog} = this.props;

        return <div className={'dialog scrollbar'}>
            <div>{error}</div>
            <CustomInput placeholder={getTranslations({text: 'name'})}
                   value={name}
                   onChange={this.handleChangedName}
                   handleKeyPress={this.handleKeyPress}/>
            <div className={'dialog__sub-header'}>{getTranslations({text: 'text'})}</div>
            <div className={'dialog__line'}>
                <textarea onChange={this.handleChangedText} value={text} rows="10" cols="75"/>
            </div>
            <span className={'dialog__sub-header'}>{getTranslations({text: 'limitations'})}:</span>
            <div className={'dialog__line'}>
                <span className={'dialog__line__label'}>{getTranslations({text: 'time'})}: </span>
                <CustomInput type="number" placeholder={getTranslations({text: 'time', format: 'lowercase'})}
                             onChange={this.handleChangedTime} value={time} handleKeyPress={this.handleKeyPress}/>
                <span className={'dialog__line__label'}>{getTranslations({text: 'memory'})}: </span>
                <CustomInput type="number" placeholder={getTranslations({text: 'memory', format: 'lowercase'})}
                             onChange={this.handleChangedMemory} value={memory} handleKeyPress={this.handleKeyPress}/>
            </div>
            <div className={'dialog__line'}>
                <span>{getTranslations({text: 'checker'})}: </span>
                <FileUploader accept={'.cs, .cpp'} onChange={this.handleUploadChecker}>
                    <button className={'button button_borderless button_icon'}>
                        <Icon type={'file'} className={'icon'}/>
                    </button>
                </FileUploader>
                {
                    checker &&
                    <>
                        <span>{checker.name}</span>
                        <button className={'button button_borderless button_icon'} onClick={this.handleRemoveChecker}>
                            <Icon type={'delete'} className={'icon'}/>
                        </button>
                    </>
                }
            </div>
            <div className={'dialog__line'}>
                <span>Generator: </span>
                <FileUploader accept={'.cs, .cpp'} onChange={this.handleUploadGenerator}>
                    <button className={'button button_borderless button_icon'}>
                        <Icon type={'file'} className={'icon'}/>
                    </button>
                </FileUploader>
                {
                    generator &&
                    <>
                        <span>{generator.name}</span>
                        <button className={'button button_borderless button_icon'} onClick={this.handleRemoveGenerator}>
                            <Icon type={'close'} className={'icon'}/>
                        </button>
                    </>
                }
            </div>
            <div className={'dialog__sub-header'}>{getTranslations({text: 'tests'})}:</div>
            {
                //TODO: add check for not loaded files ('undefined-undefined' case)
                tests.length > 0 &&
                tests.map((item, id) => <div className={'dialog__line'} key={id}>
                    <span>{item.description + ' ( ' + item.input.name + ' - ' + item.output.name + ' )'}</span>
                    <button className={'button button_borderless button_icon'} key={'test_' + id} onClick={this.deleteTest}>
                        <Icon type={'delete'} className={'icon'}/>
                    </button>
                </div>)
            }
            <div className={'dialog__line'}>
                <FileUploader accept={'.txt'} onChange={this.handleUploadTestInput}>
                    <div className={'dialog__line'}>
                        <span className={'dialog__line__label'}>{getTranslations({text: 'input'})}: </span>
                        <button className={'button button_borderless button_icon'}>
                            <Icon type={'file'} className={'icon'}/>
                        </button>
                    </div>
                </FileUploader>
                {
                    testInput &&
                    <>
                        <span className={'dialog__line__label'}>{testInput.name}</span>
                        <button className={'button button_borderless button_icon'} onClick={this.handleRemoveTestInput}>
                            <Icon type={'delete'} className={'icon'}/>
                        </button>
                    </>
                }
                <FileUploader accept={'.txt'} onChange={this.handleUploadTestOutput}>
                    <div className={'dialog__line'}>
                        <span className={'dialog__line__label'}>{getTranslations({text: 'output'})}: </span>
                        <button className={'button button_borderless button_icon'}>
                            <Icon type={'file'} className={'icon'}/>
                        </button>
                    </div>
                </FileUploader>
                {
                    testOutput &&
                    <>
                        <span className={'dialog__line__label'}>{testOutput.name}</span>
                        <button className={'button button_borderless button_icon'} onClick={this.handleRemoveTestOutput}>
                            <Icon type={'delete'} className={'icon'}/>
                        </button>
                    </>
                }
            </div>
            <div className={'dialog__line'}>
                <CustomInput placeholder={getTranslations({text: 'test description', format: 'lowercase'})}
                       value={testDescription}
                       onChange={this.handleChangedTestDescription}
                       handleKeyPress={this.handleKeyPress}/>
                <button className={'button button_borderless button_icon'} onClick={this.addTest}>
                    <Icon type={'add'} className={'icon'}/>
                </button>
            </div>
            <div className={'dialog__button-panel'}>
                <button className={'button'} disabled={isCreating} onClick={this.add}>{isCreating ? 'Wait' : getTranslations({text: 'add'})}</button>
                <button className={'button'} disabled={isCreating} onClick={closeProblemCreatingDialog}>{isCreating ? 'Wait' : getTranslations({text: 'cancel'})}</button>
            </div>
        </div>
    }
}

ProblemAddingForm.propTypes = {
    addProblem: PropTypes.func.isRequired,
    closeProblemCreatingDialog: PropTypes.func.isRequired,
};

export default connect(state => ({
    isCreating: state.problem.isCreating,
    error: state.problem.error
}), actions)(ProblemAddingForm)
