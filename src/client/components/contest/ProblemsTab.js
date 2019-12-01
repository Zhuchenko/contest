import React from 'react'
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const ProblemsTab =  ({problems, contestId}) => {
        return (problems.map(({id, name}) => <Link to={'/contests/' + contestId + '/problems/' + id}>{name}</Link>));
};

ProblemsTab.propTypes = {
    contestId: PropTypes.string.isRequired,
    problems: PropTypes.array.isRequired,
};

export default ProblemsTab;
