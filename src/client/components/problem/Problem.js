import React, {Component} from 'react'
import {getProblem, getProblemFromContest, sendParcel} from '../../services/problemApi'
import FileUploader from 'react-input-files'
import getTranslations from '../../utilities/getTranslations'
import marked from 'marked'
import languageOptions from './languages'

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
            language: '',
            selectedId: 0,
            attachedFile: '',
            results: '',
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
                        language: languageOptions.find(l => l.id === language),
                        isParticipant
                    });
                })
        } else {
            getProblem(problemId)
                .then(({name, text, limitation}) => {
                    this.setState({name, text, limitation});
                })
        }
    }

    handleUploadFile = (files) => {
        if (files && files[0]) {
            this.setState({attachedFile: files[0], results: ''});
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
                    this.setState(results)
                })
        } else {
        }
    };

    render() {
        const {name, text, limitation: {time, memory}, language, attachedFile, results, isParticipant} = this.state;

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
                            <FileUploader accept={language.ext} onChange={this.handleUploadFile}>
                                <button className={'button'}>{getTranslations({text: 'upload'})}</button>
                            </FileUploader>
                            {attachedFile ?
                                <div>{attachedFile.name}</div>
                                : null}
                        </div>
                        <button className={'button'}
                                onClick={this.sendSolution}>{getTranslations({text: 'send'})}</button>
                        {results ?
                            results.map((result, index) =>
                                <div key={index}>
                                    {getTranslations({text: 'number'})}: {result.number} {result.shortening}
                                    <br/>
                                    {result.message}
                                </div>)
                            : null}
                    </div>
                    : null
                }
            </div>
        )
    }
}

export default Problem