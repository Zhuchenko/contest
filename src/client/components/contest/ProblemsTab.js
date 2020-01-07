import React from 'react'
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const ProblemsTab =  ({sets, contestId, isParticipant}) => {
    console.log(sets)
    return (
        sets.map(({id, name, problems}) => (<div className={'wrapper__line'}>
            {!isParticipant ? <Link key={id} to={'/sets/' + id}>{name}</Link> : null}
            {
                problems.map(({id, name}) =>
                    <Link key={id} to={'/contests/' + contestId + '/problems/' + id}>{name}</Link>)
            }
        </div>))
    )
};

ProblemsTab.propTypes = {
    contestId: PropTypes.string.isRequired,
    problems: PropTypes.array.isRequired,
    isParticipant: PropTypes.bool.isRequired,
};

export default ProblemsTab;
