import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const ItemWithCheckBox = ({id, path, name, isSelected, handleChecked}) => {
    const handleChanged = ({target: {id}}) => {
        handleChecked(id);
    };

    return (
        <div>
            <input type="checkbox" id={id} onChange={handleChanged} checked={isSelected}/>
            <Link to={path + id}>{name}</Link>
        </div>
    )
};


ItemWithCheckBox.propTypes = {
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default ItemWithCheckBox