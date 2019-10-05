import React from 'react'
import PropTypes from 'prop-types'
import getClassNames from '../../utilities/getClassnames'

import './css/input.css'

const Input = (props) => {
    const {placeholder, onChange, value, type, isValid, errorMessage} = props;
    const classes = getClassNames({['sign__input']: true, ['sign__input--error']: !isValid});

    return (
        <div>
            <input
                type={type ? type : 'text'}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={classes}/>
            {
                !isValid &&
                <div className='sign__error_message'>{errorMessage}</div>
            }
        </div>
    )
}

Input.propTypes = {
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string,
    isValid: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
};

export default Input