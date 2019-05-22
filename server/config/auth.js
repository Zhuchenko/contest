import path from 'path'
import jwt from 'express-jwt/lib'
import fs from 'fs'
import {serverConfig} from './serverConfig'

const getTokenFromHeaders = (req) => {
    const { headers: { authorization } } = req;

    if(authorization && authorization.split(' ')[0] === 'Token') {
        return authorization.split(' ')[1];
    }
    return null;
};

const secret = fs.readFileSync(path.join(__dirname, '../..', serverConfig.session.publicKeyPath));
const algorithms = ["RS256"];

const auth = {
    required: jwt({
        secret,
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        algorithms
    }),
    optional: jwt({
        secret,
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: false,
        algorithms
    })
};

module.exports = auth;