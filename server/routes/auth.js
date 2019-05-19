const jwt = require('express-jwt');
import {serverConfig} from '../config/serverConfig'

const getTokenFromHeaders = (req) => {
    const { headers: { authorization } } = req;

    if(authorization && authorization.split(' ')[0] === 'Token') {
        return authorization.split(' ')[1];
    }
    return null;
};

const auth = {
    required: jwt({
        secret: serverConfig.authorization.jwtSecret,
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        algorithms: ["RS256"]
    }),
    optional: jwt({
        secret: serverConfig.authorization.jwtSecret,
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: false,
        algorithms: ["RS256"]
    })
};

module.exports = auth;