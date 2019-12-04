import express from 'express'
import passport from 'passport'
import auth from '../config/auth'
import * as db from '../mongoose/DatabaseHandler'
import generateCode from '../utils/generateCode'
import {VerifyEmail} from '../sendmailService'
import {getUserById} from '../mongoose/api/user'
import {getUnverifiedUser} from '../mongoose/api/unverifiedUser'

import '../config/passport'

const router = express.Router();

router.post('/signup', auth.optional, async (req, res) => {
    const {body: {email, password, name, lastName, authKey}} = req;

    let unverifiedUser;
    try {
        unverifiedUser = await getUnverifiedUser({authKey, name, lastName});
    } catch (e) {
        return res.status(400).end();
    }
    if (!unverifiedUser) {
        return res.json({errorMessage: "it does not match"});
    }

    unverifiedUser.email = email;
    unverifiedUser.generateHash(password);
    try {
        await unverifiedUser.save();
    } catch (e) {
        return res.status(500).end();
    }

    const code = generateCode(8);
    try {
        await db.addCode({email, code});
        VerifyEmail(email, code);
    } catch (e) {
        return res.status(500).end();
    }

    res.status(200).end();
});

router.get('/verify-email/:code', auth.optional, async (req, res) => {
    const {params: {code}} = req;

    let rightCode;
    try {
        rightCode = await db.getCode(code);
    } catch (e) {
        return res.status(400).end();
    }
    if (!rightCode) {
        return res.status(422).end();
    }

    try {
        const {id, email, name, lastName, role, _hash, _salt} = await db.getUnverifiedUserByEmail(rightCode.email); //getAndDelete
        db.deleteUnverifiedUser(id);
        db.addUser({email, name, lastName, role, _hash, _salt});
        db.deleteCode(rightCode.id);
    } catch (e) {
        return res.status(500).end();
    }

    res.status(200).end();
});

router.get('/signin', auth.required, async (req, res) => {
    const {payload: {id}} = req;

    let user;
    try {
        user = await getUserById(id);
    } catch (e) {
        return res.status(400).end();
    }
    if (!user) {
        return res.status(400).end();
    }

    let rights;
    try {
        rights = await db.getUserRights(user.id);
    } catch (e) {
        return res.status(500).json({e});
    }

    return res.json({...user.toAuthJSON(), rights});
});

router.post('/signin', auth.optional, async (req, res, next) => {
    const {body: {email}} = req;

    let user;
    try {
        user = await db.getUserByEmail(email);
    } catch (e) {
        return res.status(422).json({errorMessage: 'email is not valid'});
    }
    if (!user) {
        return res.status(422).json({errorMessage: 'email is not valid'});
    }

    return passport.authenticate('local', {session: false}, async (err, passportUser) => {
        if (err) {
            return res.status(500).json({err});
        }

        if (passportUser) {
            const finalUser = passportUser;
            finalUser.token = passportUser.generateJWT();

            let rights;
            try {
                rights = await db.getUserRights(user.id);
            } catch (e) {
                return res.status(500).json({e});
            }
            return res.json({...finalUser.toAuthJSON(), rights});
        }
        return res.status(422).json({errorMessage: 'password is wrong'});
    })(req, res, next);
});

module.exports = router;