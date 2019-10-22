import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

//import './css/item.css'

const UserItemWithCheckBox = (props) => {

    const {id, name, lastName, isSelected, handleChecked} = props;

    const handleChanged = ({target: {id}}) => {
        handleChecked(id);
    };

    return (
        <div>
            <input type="checkbox" id={id} onChange={handleChanged} checked={isSelected}/>
            <Link to={'/users/' + id}>{lastName + ' ' + name}</Link>
        </div>
    )
};


UserItemWithCheckBox.propTypes = {
    name: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default UserItemWithCheckBox