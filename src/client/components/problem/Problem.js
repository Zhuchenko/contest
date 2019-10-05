import React, {Component} from 'react'
import { getProblem, sendParcel } from '../../services/problemApi'
import FileUploader from 'react-input-files'

import './css/problem.css';

class Problem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            text: '',
            limitation: {
                time: 120,
                memory: 5
            },
            options: [],
            selectedId: 0,
            attachedFile: '',
            results: ''
        }
    }

    componentDidMount() {
        getProblem(this.props.match.params.problemId)
            .then(problem => {
                this.setState({
                    name: problem.name,
                    text: problem.text,
                    limitation: problem.limitation,
                    options: problem.options
                });
            })
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

        if (attachedFile) {
            sendParcel({
                problem: this.props.match.params.problemId,
                contest: "5cd846b9d2770317bdf60cdb",
                options: options[selectedId]
            }, attachedFile)
                .then(results => {
                    this.setState({results})
                })
        } else {
        }
    };

    render() {
        const {name, text, limitation: {time, memory}, options, attachedFile, results} = this.state;

        const languageOptions =
            options.map((option, index) =>
                <option key={index}>{option.language} ({option.compiler})</option>);

        const attachedFileName =
            attachedFile ?
                <div>{attachedFile.name}</div>
                : null;

        const resultsOfSendingSolution =
            results ?
                results.map((result, index) =>
                    <div key={index}>
                        number: {result.number} {result.shortening}
                        <br/>
                        {result.message}
                    </div>)
                : null;

        return (
            <div className={'problem'}>
                <h1>{name}</h1>
                <div className={'problem__text'}>{text}</div>
                <div className={'problem__limitations'}>
                    <label>Limitations:</label>
                    <div>time: {time}</div>
                    <div>memory: {memory}</div>
                </div>
                <div>
                    <label>Language:</label>
                    <select className={'problem__select'} onChange={this.handleOptionsChange}>
                        { languageOptions }
                    </select>
                </div>
                <div>
                    <FileUploader accept={'.cs, .cpp'} onChange={this.handleUploadFile}>
                        <button className={'problem__button'} >Upload</button>
                    </FileUploader>
                    { attachedFileName }
                </div>
                <button className={'problem__button'} onClick={this.sendSolution}>Send</button>
                { resultsOfSendingSolution }
            </div>
        )
    }
}

export default Problem