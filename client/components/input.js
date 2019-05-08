import React, {Component} from 'react'
import PropTypes from 'prop-types'
import getClassNames, {getClassnames} from '../utilities/getClassnames'

import './css/input.css'

class Input extends Component {
    render() {
        const {placeholder, onChange, value, isValid, errorMessage} = this.props;
        const classes =  getClassNames({['input']: true, ['input--error']: !isValid});

        return (
            <input
                type='text'
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={classes}/>
        )
    }
}

Input.propTypes = {
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    isValid: PropTypes.Bool.isRequired,
    errorMessage: PropTypes.string
};

export default Input