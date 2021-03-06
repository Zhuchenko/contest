import React from 'react'
import PropTypes from 'prop-types'
import getTranslations from '../../utilities/getTranslations'

const Icon = (props) => {
    const {type, className} = props;

    switch (type) {
        case 'delete':
            return (
                <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>{getTranslations({text: 'delete'})}</title>
                    <path fill="none" d="M0 0h24v24H0V0z"/>
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                </svg>
            );

        case 'file':
            return (
                <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>{getTranslations({text: 'file'})}</title>
                    <path fill="none" d="M0 0h24v24H0V0z"/>
                    <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
                </svg>
            );

        case 'add':
            return (
                <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>{getTranslations({text: 'add'})}</title>
                    <path fill="none" d="M0 0h24v24H0V0z"/>
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
            );

        case 'edit':
            return (
                <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>{getTranslations({text: 'edit'})}</title>
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
            );

        case 'share':
            return (
                <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>{getTranslations({text: 'share'})}</title>
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                </svg>
            );

        case 'move_right':
            return (
                <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <title>{getTranslations({text: 'move right'})}</title>
                    <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
            );

        case 'move_left':
            return (
                <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <title>{getTranslations({text: 'move left'})}</title>
                    <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
            );
    }
};

Icon.propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default Icon