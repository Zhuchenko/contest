import React, {Component} from 'react'
import { getProblem, sendParcel } from '../../services/problemApi'
import FileUploader from 'react-input-files'

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
            sendParcel({
                problem: this.props.match.params.problemId,
                contest: "5cd846b9d2770317bdf60cdb",
                options: this.state.options[this.state.selectedId]
            }, files[0])
                .then(results => {
                    this.setState({results})
                })
        } else {
        }
    };

    render() {
        const {name, text, limitation: {time, memory}, options, results} = this.state;
        return (
            <div>
                <h3>{name}</h3>
                <div>{text}</div>
                <div>Limitations:<br/>time: {time}<br/>memory: {memory}</div>
                <label>Language:</label>
                <select onChange={this.handleOptionsChange}>
                    {
                        options.map((option, index) =>
                            <option key={index}>{option.language} ({option.compiler})</option>)
                    }
                </select>
                <FileUploader accept={'.cs, .cpp'} onChange={this.handleUploadFile}>
                    <button onClick={(e) => {
                    }}>Х
                    </button>
                </FileUploader>
                {
                    results &&
                    results.map((result, index) =>
                        <div key={index}>
                            number: {result.number} {result.shortening}
                            <br/>
                            {result.message}
                        </div>)
                }
            </div>
        )
    }
}

export default Problem