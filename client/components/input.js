import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './css/input.css'

class Input extends Component {
    render() {
        const {placeholder, onChange, value} = this.props;

        return (
            <input
                type='text'
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={'input'}/>
        )
    }
}

Input.propTypes = {
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

export default Input