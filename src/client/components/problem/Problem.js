import React, {Component} from 'react'
import {getProblem, getProblemFromContest, sendParcel} from '../../services/problemApi'
import FileUploader from 'react-input-files'

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
            options: [],
            selectedId: 0,
            attachedFile: '',
            results: '',
            isParticipant: true
        }
    }

    componentDidMount() {
        const {contestId, problemId} = this.props.match.params;
        if (contestId) {
            getProblemFromContest(contestId, problemId)
                .then(({problem: {name, text, limitation, options}, isParticipant}) => {
                    this.setState({name, text, limitation, options, isParticipant});
                })
        } else {
            getProblem(problemId)
                .then(({name, text, limitation, options}) => {
                    this.setState({name, text, limitation, options});
                })
        }
    }

    handleOptionsChange = (e) => {
        const selectedId = e.target.selectedIndex;
        this.setState({selectedId});
    };

    handleUploadFile = (files) => {
        if (files && files[0]) {
            this.setState({attachedFile: files[0], results: ''});
        }
    };

    sendSolution = () => {
        const {attachedFile, options, selectedId} = this.state;
        const {problemId, conestId} = this.props.match.params;

        if (attachedFile) {
            sendParcel({
                problem: problemId,
                contest: conestId,
                options: options[selectedId]
            }, attachedFile)
                .then(results => {
                    this.setState({results})
                })
        } else {
        }
    };

    render() {
        const {name, text, limitation: {time, memory}, options, attachedFile, results, isParticipant} = this.state;

        const languageOptions =
            options.map((option, index) =>
                <option key={index}>{option.language} ({option.compiler})</option>);

        return (
            <div className={'wrapper'}>
                <div className={'wrapper__header'}>{name}</div>
                <div className={'wrapper__line'}>{text}</div>
                <div className={'wrapper__line wrapper__line__list'}>
                    <label>Limitations:</label>
                    <div>time: {time}</div>
                    <div>memory: {memory}</div>
                </div>
                <div className={'wrapper__line'}>
                    <label>Language:</label>
                    <select className={'problem__select'} onChange={this.handleOptionsChange}>
                        {languageOptions}
                    </select>
                </div>
                {isParticipant ?
                    <div className={'wrapper__buttons-panel'}>
                        <div className={'wrapper__buttons-panel__button-with-text'}>
                            <FileUploader accept={'.cs, .cpp'} onChange={this.handleUploadFile}>
                                <button className={'button'}>Upload</button>
                            </FileUploader>
                            {attachedFile ?
                                <div>{attachedFile.name}</div>
                                : null}
                        </div>
                        <button className={'button'} onClick={this.sendSolution}>Send</button>
                        {results ?
                            results.map((result, index) =>
                                <div key={index}>
                                    number: {result.number} {result.shortening}
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