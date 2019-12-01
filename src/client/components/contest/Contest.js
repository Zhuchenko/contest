import React, {Component} from 'react'
import TabBar from '../common/TabBar'
import ParticipantsTab from './ParticipantsTab'
import ProblemsTab from './ProblemsTab'
import {getContest} from '../../services/contestApi'

const participantTab = {
    id: "participants",
    text: "participants"
};

const problemTab = {
    id: "problems",
    text: "problems"
};

class Contest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: participantTab.id,
            isParticipant: true,
            participants: [],
            problems: [],
            status: ''
        };
        this.tabs = [participantTab, problemTab];
    }

    componentDidMount() {
        getContest(this.props.match.params.contestId)
            .then(({participants, problems, status, isParticipant}) => {
                this.setState({participants, isParticipant, problems, status})
            }).catch((errorCode) => {
            this.props.setError({errorCode});
        });
    }

    handleChanged = (tab) => {
        this.setState({selectedId: tab});
    };

    render() {
        const {selectedId, participants, problems, status, isParticipant} = this.state;

        return (
            <>
            <div>{status}</div>
                <TabBar handleChanged={this.handleChanged} tabs={this.tabs}
                        selectedId={selectedId}/>
                {
                    (selectedId === participantTab.id) &&
                    <ParticipantsTab {...{participants, isParticipant}} contestId={this.props.match.params.contestId}/>
                }
                {
                    (selectedId === problemTab.id) &&
                    <ProblemsTab {...{problems, isParticipant}} contestId={this.props.match.params.contestId}/>
                }
            </>
        )
    }
}

export default Contest;
