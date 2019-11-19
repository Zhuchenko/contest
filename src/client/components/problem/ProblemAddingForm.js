import React, {Component} from 'react'
import PropTypes from "prop-types";
import Input from "../common/input";
import {connect} from "react-redux";
import * as actions from "../../redux/problem/actions";
import FileUploader from "react-input-files";

//import './css/user.css';

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

    deleteOption = ({target: {id}}) => {
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

    deleteTest = ({target: {id}}) => {
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
        return <div>
            <Input placeholder="Name"
                   value={name}
                   onChange={this.handleChangedName}
                   handleKeyPress={this.handleKeyPress}/>
            <div>Text</div>
            <textarea onChange={this.handleChangedText} value={text} rows="10" cols="75"/>
            <div>Options:</div>
            {
                options.length > 0 &&
                options.map((item, id) => <div key={id}>
                    <span>{item.language + ' - ' + item.compiler}</span>
                    <button id={'option_' + id} onClick={this.deleteOption}>X</button>
                </div>)
            }
            <div className={'line'}>
                <Input placeholder="language"
                       value={language}
                       onChange={this.handleChangedLanguage}
                       handleKeyPress={this.handleKeyPress}/>
                <Input placeholder="compiler"
                       value={compiler}
                       onChange={this.handleChangedCompiler}
                       handleKeyPress={this.handleKeyPress}/>
                <button onClick={this.addOption}>+</button>
            </div>
            <span>Limitations:</span>
            <div className={'line'}>
                <span>Time: </span>
                <Input type="number" placeholder={'time'} onChange={this.handleChangedTime} value={time}
                       handleKeyPress={this.handleKeyPress}/>
                <span>Memory: </span>
                <Input type="number" placeholder={'memory'} onChange={this.handleChangedMemory} value={memory}
                       handleKeyPress={this.handleKeyPress}/>
            </div>
            <div className={'line'}>
                <span>Checker: </span>
                <FileUploader accept={'.cs, .cpp'} onChange={this.handleUploadChecker}>
                    <button className={'problem__button'}>&#8593;</button>
                </FileUploader>
                {
                    checker &&
                    <>
                        <span>{checker.name}</span>
                        <button onClick={this.handleRemoveChecker}>x</button>
                    </>
                }
            </div>
            <div>Tests:</div>
            {
                tests.length > 0 &&
                tests.map((item, id) => <div key={id}>
                    <span>{item.description + ' ( ' + item.input.name + ' - ' + item.output.name + ' )'}</span>
                    <button key={'test_' + id} onClick={this.deleteTest}>X</button>
                </div>)
            }
            <div className={'line'}>
                <FileUploader accept={'.txt'} onChange={this.handleUploadTestInput}>
                    <button className={'problem__button'}>&#8593;</button>
                </FileUploader>
                {
                    testInput &&
                    <>
                        <span>{testInput.name}</span>
                        <button onClick={this.handleRemoveTestInput}>x</button>
                    </>
                }
                <FileUploader accept={'.txt'} onChange={this.handleUploadTestOutput}>
                    <button className={'problem__button'}>&#8593;</button>
                </FileUploader>
                {
                    testOutput &&
                    <>
                        <span>{testOutput.name}</span>
                        <button onClick={this.handleRemoveTestOutput}>x</button>
                    </>
                }
                <Input placeholder="test-description"
                       value={testDescription}
                       onChange={this.handleChangedTestDescription}
                       handleKeyPress={this.handleKeyPress}/>
                <button onClick={this.addTest}>+</button>
            </div>
            <button onClick={this.add}>Add</button>
            <button onClick={this.props.close}>Cancel</button>
        </div>
    }
}

ProblemAddingForm.propTypes = {
    close: PropTypes.func.isRequired,
    addProblem: PropTypes.func.isRequired
};

export default connect(null, actions)(ProblemAddingForm)
