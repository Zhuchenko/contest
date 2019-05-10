import React, {Component} from 'react'
import PropTypes from 'prop-types'
import getClassNames from '../utilities/getClassnames'

import './css/input.css'

class Input extends Component {
    render() {
        const {placeholder, onChange, value, isValid, errorMessage} = this.props;
        const classes =  getClassNames({['input']: true, ['input--error']: !isValid});

        return (
            <div>
                <input
                    type='text'
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    className={classes}/>
                    {
                        !isValid &&
                        <p className='error_message'>{errorMessage}</p>
                    }
            </div>
        )
    }
}

Input.propTypes = {
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    isValid: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
};

export default Input