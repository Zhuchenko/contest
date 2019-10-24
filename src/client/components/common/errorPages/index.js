import React from 'react';
import {ForbiddenPage} from "./Forbidden";
import {NotFoundPage} from "./NotFound";

const FORBIDDEN = 403;
const NOT_FOUND = 404;

export const ErrorPage = ({errorCode}) => {
    if(errorCode === FORBIDDEN)
        return <ForbiddenPage/>;
    if(errorCode === NOT_FOUND)
        return <NotFoundPage/>;
    return null;
};