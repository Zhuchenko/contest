import React, {Component} from 'react'
import {getParticipants} from '../../services/contestApi'
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const UserInGroup = ({id, name, lastName}) => <Link key={id} to={'/users/' + id}>{lastName + ' ' + name}</Link>;

class ParticipantsTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participants: [],
            isParticipant: false
        }
    }

    componentDidMount() {
        getParticipants(this.props.contestId)
            .then(({participants, isParticipant}) => {
                this.setState({participants, isParticipant})
            }).catch((errorCode) => {
            this.props.setError({errorCode});
        });
    }

    render() {
        const {participants, isParticipant} = this.state;

        return (
            participants.map(({id, name, users}) => (<>
                <br/>
                {!isParticipant ? <Link key={id} to={'/groups/' + id}>{name}</Link> : null}
                <br/>
                {
                    users.map((user) => <UserInGroup {...user}/>)
                }
            </>))
        )
    }
}

ParticipantsTab.propTypes = {
    contestId: PropTypes.string.isRequired,
};

export default ParticipantsTab;
