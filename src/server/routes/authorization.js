import express from 'express'
import passport from 'passport'
import auth from '../config/auth'
import * as db from '../mongoose/DatabaseHandler'
import generateCode from '../utils/generateCode'
import {VerifyEmail} from "../sendmailService";
import {getUserById} from '../mongoose/api/user'

import '../config/passport'

const router = express.Router();

router.post('/signup', auth.optional, (req, res) => {
    const {body: {email, password, name, lastName, authKey}} = req;

    (async () => {
        const unverifiedUser = await db.getUnverifiedUser({authKey, name, lastName});
        if (!unverifiedUser) {
            return res.json({errorMessage: "it does not match"});
        }
        unverifiedUser.email = email;
        unverifiedUser.generateHash(password);
        await unverifiedUser.save();

        const code = generateCode(8);
        db.addCode({email, code});
        VerifyEmail(email, code);

        res.status(200).end();

    })();
});

router.get('/verify-email/:code', auth.optional, (req, res) => {
    const {params: {code}} = req;

    return (async () => {
        const rightCode = await db.getCode(code);
        if (!rightCode) {
            return res.status(422).end();
        }

        const {_id, email, name, lastName, role, _hash, _salt} = await db.getUnverifiedUserByEmail(rightCode.email); //getAndDelete
        db.deleteUnverifiedUser(_id);
        db.addUser({email, name, lastName, role, _hash, _salt});
        db.deleteCode(rightCode._id);

        res.status(200).end();
    })();
});

router.get('/signin', auth.required, (req, res) => {
    const {payload: {id}} = req;

    return (async () => {
        const user = await getUserById(id);
        if (!user) {
            return res.status(400).end();
        }

        const rights = await db.getUserRights(user._id);
        return res.json({...user.toAuthJSON(), rights});
    })()
});

router.post('/signin', auth.optional, (req, res, next) => {
    const {body: {email}} = req;

    (async () => {
        const user = await db.getUserByEmail(email);

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

                const rights = await db.getUserRights(user._id);
                return res.json({...finalUser.toAuthJSON(), rights});
            }
            return res.status(422).json({errorMessage: 'password is wrong'});
        })(req, res, next);
    })()
});

module.exports = router;