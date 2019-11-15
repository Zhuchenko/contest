import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const ProblemItemWithCheckBox = (props) => {
    const {id, name, isSelected, handleChecked} = props;

    const handleChanged = ({target: {id}}) => {
        handleChecked(id);
    };

    return (
        <div>
            <input type="checkbox" id={id} onChange={handleChanged} checked={isSelected}/>
            <Link to={'/problems/' + id}>{name}</Link>
        </div>
    )
};

ProblemItemWithCheckBox.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default ProblemItemWithCheckBox