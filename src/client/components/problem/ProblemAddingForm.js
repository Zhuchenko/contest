import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {toastr} from "react-redux-toastr";
import CustomInput from '../common/CustomInput'
import {connect} from 'react-redux'
import * as actions from '../../redux/problem/actions'
import FileUploader from 'react-input-files'
import Select from 'react-select'
import Icon from '../common/Icon'
import getTranslations from '../../utilities/getTranslations'
import languageOptions from './languages'

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
            languageIndex: 0,
            generator: '',
            tests: [],
            testInput: '',
            testOutput: '',
            testDescription: ''
        }
    }

    add = () => {
        const {name, text, time, memory, checker, generator, tests, languageIndex} = this.state;
        if (!name){
            toastr.error(getTranslations({text: 'error'}), getTranslations({text: 'name error message'}));
            return;
        }
        if (!text){
            toastr.error(getTranslations({text: 'error'}), getTranslations({text: 'text error message'}));
            return;
        }
        if (time <= 0){
            toastr.error(getTranslations({text: 'error'}), getTranslations({text: 'time error message'}));
            return;
        }
        if (memory <= 0){
            toastr.error(getTranslations({text: 'error'}), getTranslations({text: 'time error message'}));
            return;
        }
        if (!checker){
            toastr.error(getTranslations({text: 'error'}), getTranslations({text: 'checker error message'}));
            return;
        }
        if (!generator){
            toastr.error(getTranslations({text: 'error'}), getTranslations({text: 'generator error message'}));
            return;
        }
        if (tests.length === 0){
            toastr.error(getTranslations({text: 'error'}), getTranslations({text: 'number of tests error message'}));
            return;
        }
        const {addProblem} = this.props;
        const language = languageOptions[languageIndex].id;
        addProblem({problem: {name, text, limitation: {time, memory}, language}, checker, generator, tests});
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

    handleChangeLanguage = ({value}) => {
        this.setState({languageIndex: value});
    };

    handleUploadChecker = (files) => {
        if (files && files[0]) {
            if (files[0].size > 0) {
                this.setState({checker: files[0]});
            } else {
                toastr.error(getTranslations({text: 'error'}), getTranslations({text: 'size of file error message'}));
            }
        }
    };

    handleRemoveChecker = () => {
        this.setState({checker: ''});
    };

    handleUploadGenerator = (files) => {
        if (files && files[0] && files[0].size > 0) {
            if (files[0].size > 0) {
                this.setState({generator: files[0]});
            } else {
                toastr.error(getTranslations({text: 'error'}), getTranslations({text: 'size of file error message'}));
            }
        }
    };

    handleRemoveGenerator = () => {
        this.setState({generator: ''});
    };

    handleUploadTests = (files) => {
        let {tests} = this.state;

        if (files) {
            for (let i = 0; i < files.length; i++) {
                if (files[i]) {
                    if (files[i].size > 0) {
                        tests.push({file: files[i], description: ''});
                    } else {
                        toastr.warning('Warning', 'Size of `' + files[i].name + '`  was be equal  0. It was ignored.');
                    }
                }
            }
            this.setState({tests});
        }
    };

    handleChangedTestDescription = ({target: {id, value}}) => {
        const i = getIndex(id);
        let {tests} = this.state;
        tests[i].description = value;
        this.setState({tests});
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
        const {name, text, time, memory, checker, generator, languageIndex, tests} = this.state;
        const {isCreating, error, closeProblemCreatingDialog} = this.props;

        return <div className={'dialog dialog--fixed-width scrollbar'}>
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
                <CustomInput type="number" min={0} step={10} placeholder={getTranslations({text: 'time', format: 'lowercase'})}
                             onChange={this.handleChangedTime} value={time.toString()} handleKeyPress={this.handleKeyPress}/>
                <span className={'dialog__line__label'}>{getTranslations({text: 'memory'})}: </span>
                <CustomInput type="number" min={0} step={8}  placeholder={getTranslations({text: 'memory', format: 'lowercase'})}
                             onChange={this.handleChangedMemory} value={memory.toString()} handleKeyPress={this.handleKeyPress}/>
            </div>
            <div className={'dialog__line'}>
                <span className={'dialog__line__label'}>{getTranslations({text: 'languages'})}: </span>
                <Select onChange={this.handleChangeLanguage} defaultValue={
                        {
                            key: languageOptions[0].id,
                            value: 0,
                            label: languageOptions[0].text
                        }
                    } options={
                        languageOptions.map((lang, i) => ({
                            key: lang.id,
                            value: i,
                            label: lang.text
                        }))
                    }
                    className="r-select-container r-select-container--single"
                    classNamePrefix="r-select"
                    placeholder={''}
                    noOptionsMessage={() => getTranslations({text: 'no options message'})}
                />
            </div>
            <div className={'dialog__line'}>
                <span className={'dialog__line__label'}>{getTranslations({text: 'checker'})}: </span>
                <FileUploader accept={languageOptions[languageIndex].ext} onChange={this.handleUploadChecker}>
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
                <span className={'dialog__line__label'}>{getTranslations({text: 'generator'})}: </span>
                <FileUploader accept={languageOptions[languageIndex].ext} onChange={this.handleUploadGenerator}>
                    <button className={'button button_borderless button_icon'}>
                        <Icon type={'file'} className={'icon'}/>
                    </button>
                </FileUploader>
                {
                    generator &&
                    <>
                        <span>{generator.name}</span>
                        <button className={'button button_borderless button_icon'} onClick={this.handleRemoveGenerator}>
                            <Icon type={'delete'} className={'icon'}/>
                        </button>
                    </>
                }
            </div>
            <div className={'dialog__sub-header'}>{getTranslations({text: 'tests'})}:</div>
            {
                tests.length > 0 &&
                tests.map((item, id) =>
                    <div className={'dialog__line'} key={id}>
                        <span>{(id + 1) + '. ' + item.file.name}</span>
                        <CustomInput id={'test-description_' + id}
                                     placeholder={getTranslations({text: 'test description', format: 'lowercase'})}
                                     value={item.description}
                                     onChange={this.handleChangedTestDescription}
                                     handleKeyPress={this.handleKeyPress}/>
                        <button id={'test_' + id} className={'button button_borderless button_icon'}
                                onClick={this.deleteTest}>
                            <Icon type={'delete'} className={'icon'}/>
                        </button>
                    </div>)
            }
            <div className={'dialog__line'}>
                <FileUploader multiple={true} accept={'.txt'} onChange={this.handleUploadTests}>
                    <div className={'dialog__line'}>
                        <span className={'dialog__line__label'}>{getTranslations({text: 'input'})}: </span>
                        <button className={'button button_borderless button_icon'}>
                            <Icon type={'file'} className={'icon'}/>
                        </button>
                    </div>
                </FileUploader>
            </div>
            <div className={'dialog__button-panel'}>
                <button className={'button'} disabled={isCreating}
                        onClick={this.add}>{isCreating ? 'Wait' : getTranslations({text: 'add'})}</button>
                <button className={'button'} disabled={isCreating}
                        onClick={closeProblemCreatingDialog}>{isCreating ? 'Wait' : getTranslations({text: 'cancel'})}</button>
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
