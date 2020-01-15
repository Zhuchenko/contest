import React, {Component} from 'react'
import {getProblem, getProblemFromContest, sendParcel} from '../../services/problemApi'
import FileUploader from 'react-input-files'
import getTranslations from '../../utilities/getTranslations'
import marked from 'marked'
import languageOptions from './languages'
import {toastr} from "react-redux-toastr";
import Icon from "../common/Icon";
import {connect} from "react-redux";
import * as actions from "../../redux/application/actions";

class Problem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            text: '',
            limitation: {
                time: 0,
                memory: 0
            },
            languageExt: '',
            attachedFile: '',
            results: [],
            isParticipant: false
        }
    }

    componentDidMount() {
        const {contestId, problemId} = this.props.match.params;
        if (contestId) {
            getProblemFromContest(contestId, problemId)
                .then(({problem: {name, text, limitation, language}, isParticipant}) => {
                    this.setState({
                        name,
                        text,
                        limitation,
                        languageExt: languageOptions.find(l => l.id === language).ext,
                        isParticipant
                    });
                })
                .catch((errorCode) => {
                    this.props.setError({errorCode});
                });
        } else {
            getProblem(problemId)
                .then(({name, text, limitation}) => {
                    this.setState({name, text, limitation});
                })
                .catch((errorCode) => {
                    this.props.setError({errorCode});
                });
        }
    }

    handleUploadFile = (files) => {
        if (files && files[0]) {
            if (files[0].size > 0) {
                this.setState({attachedFile: files[0], results: []});
            } else {
                toastr.error(getTranslations({text: 'error'}), getTranslations({text: 'size of file error message'}));
            }
        }
    };

    sendSolution = () => {
        const {attachedFile} = this.state;
        const {problemId, contestId} = this.props.match.params;

        if (attachedFile) {
            sendParcel({
                problemId,
                contestId
            }, attachedFile)
                .then(results => {
                    this.setState({results})
                })
        } else {
        }
    };

    render() {
        const {name, text, limitation: {time, memory}, languageExt, attachedFile, results, isParticipant} = this.state;

        return (
            <div className={'wrapper'}>
                <div className={'wrapper__header'}>{name}</div>
                <div dangerouslySetInnerHTML={{__html: marked(text)}}/>
                <div className={'wrapper__line wrapper__line__list'}>
                    <label>{getTranslations({text: 'limitations'})}:</label>
                    <div>{getTranslations({text: 'time'})}: {time}</div>
                    <div>{getTranslations({text: 'memory'})}: {memory}</div>
                </div>
                {isParticipant ?
                    <div className={'wrapper__buttons-panel'}>
                        <div className={'wrapper__buttons-panel__button-with-text'}>
                            <FileUploader accept={languageExt} onChange={this.handleUploadFile}>
                                <button className={'button button_borderless button_icon'}>
                                    <Icon type={'file'} className={'icon'}/>
                                </button>
                            </FileUploader>
                            {attachedFile ?
                                <div>{attachedFile.name}</div>
                                : null}
                        </div>
                        <button className={'button'}
                                onClick={this.sendSolution}>{getTranslations({text: 'send'})}</button>
                    </div>
                    : null
                }
                {isParticipant ?
                    <div className={'wrapper__line wrapper__line__list'}>
                        {results.map((result, index) =>
                            <div key={index}>
                                <label>{getTranslations({text: 'number'})} {result.number}:</label> {result.shortening}
                                <br/>
                                {result.message}
                            </div>)
                        }
                    </div>
                    : null
                }
            </div>
        )
    }
}

export default connect(null, actions)(Problem);