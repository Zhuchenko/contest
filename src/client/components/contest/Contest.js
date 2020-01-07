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
            sets: [],
            status: ''
        };
        this.tabs = [participantTab, problemTab];
    }

    componentDidMount() {
        getContest(this.props.match.params.contestId)
            .then(({participants, sets, status, isParticipant}) => {
                this.setState({participants, isParticipant, sets, status})
            }).catch((errorCode) => {
            this.props.setError({errorCode});
        });
    }

    handleChanged = (tab) => {
        this.setState({selectedId: tab});
    };

    render() {
        const {selectedId, participants, sets, status, isParticipant} = this.state;

        return (
            <div className={'wrapper'}>
                <div className={'wrapper__header'}>{status}</div>
                <TabBar handleChanged={this.handleChanged} tabs={this.tabs}
                        selectedId={selectedId}/>
                {
                    (selectedId === participantTab.id) &&
                    <ParticipantsTab {...{participants, isParticipant}}/>
                }
                {
                    (selectedId === problemTab.id) &&
                    <ProblemsTab {...{sets, isParticipant}} contestId={this.props.match.params.contestId}/>
                }
            </div>
        )
    }
}

export default Contest;
