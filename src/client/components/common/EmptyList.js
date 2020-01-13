import React from 'react'
import getTranslations from '../../utilities/getTranslations'

export default () => {
    return (
        <h1>{getTranslations({text: 'no elements message'})}</h1>
    )
};
