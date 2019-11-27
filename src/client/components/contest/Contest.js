import React, {Component} from 'react'
import {Link} from "react-router-dom";
import TabBar from "../common/TabBar";
import ParticipantsTab from "./ParticipantsTab";
import ProblemsTab from "./ProblemsTab";

const participants = {
    id: "participants",
    text: "participants"
};

const problems = {
    id: "problems",
    text: "problems"
};

class Contest extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedId: participants.id};
        this.tabs = [participants, problems];
    }

    handleChanged = (tab) => {
        this.setState({selectedId: tab});
    };

    render() {

        return (
            <>
                <TabBar handleChanged={this.handleChanged} tabs={this.tabs}
                        selectedId={this.state.selectedId}/>
                {
                    (this.state.selectedId === participants.id) &&
                    <ParticipantsTab contestId={this.props.match.params.contestId}/>
                }
                {
                    (this.state.selectedId === problems.id) &&
                    <ProblemsTab contestId={this.props.match.params.contestId}/>
                }
            </>
        )
    }
}

export default Contest;
