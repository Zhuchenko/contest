import React from 'react'
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const ParticipantsTab = ({participants, isParticipant}) => {
    return (
        participants.map(({id, name, users}) => (<>
            <br/>
            {!isParticipant ? <Link key={id} to={'/groups/' + id}>{name}</Link> : null}
            <br/>
            {
                users.map(({id, name, lastName}) =>
                    <Link key={id} to={'/users/' + id}>{lastName + ' ' + name}</Link>)
            }
        </>))
    )
};

ParticipantsTab.propTypes = {
    isParticipant: PropTypes.bool.isRequired,
    participants: PropTypes.array.isRequired,
};

export default ParticipantsTab;
