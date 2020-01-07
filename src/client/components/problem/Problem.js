import React, {Component} from 'react'
import {getProblem, getProblemFromContest, sendParcel} from '../../services/problemApi'
import FileUploader from 'react-input-files'
import marked from 'marked'

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
                .then(({problem: {name, text, limitation}, isParticipant}) => {
                    this.setState({name, text, limitation, isParticipant});
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
        const {attachedFile, options, selectedId} = this.state;
        const {problemId, contestId} = this.props.match.params;

        if (attachedFile) {
            sendParcel({
                problemId,
                contestId,
                options: options[selectedId]
            }, attachedFile)
                .then(results => {
                    this.setState({results})
                })
        } else {
        }
    };

    render() {
        const {name, text, limitation: {time, memory}, attachedFile, results, isParticipant} = this.state;

        return (
            <div className={'wrapper'}>
                <div className={'wrapper__header'}>{name}</div>
                <div dangerouslySetInnerHTML={{ __html:  marked(text)}}/>
                <div className={'wrapper__line wrapper__line__list'}>
                    <label>Limitations:</label>
                    <div>time: {time}</div>
                    <div>memory: {memory}</div>
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