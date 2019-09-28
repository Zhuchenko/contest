import express from 'express'
import {getUserByEmail, getUserById, User} from '../mongoose/api/user'
import {getRightsByName} from '../mongoose/api/role'
import passport from 'passport'
import auth from '../config/auth'
import mergeRoles from '../utils/mergeRoles'

import '../config/passport'

const DEFAULT_ROLE = "participant";

const router = express.Router();

router.post('/signup', auth.optional, (req, res) => {
    const {body: {email, password, name, lastName}} = req;

    getUserByEmail(email)
        .then((user) => {
            if (user) {
                return res.status(422).json({email: {errorMessage: 'it already exists'}});
            }
        });

    if (!email) {
        return res.status(422).json({email: {errorMessage: 'it is required'}});
    }

    if (!password) {
        return res.status(422).json({password: {errorMessage: 'it is required'}});
    }

    const finalUser = new User({email, name, lastName});
    finalUser.generateHash(password);
    finalUser.role = [DEFAULT_ROLE];
    return finalUser.save()
        .then(() => {
            res.json({...finalUser.toAuthJSON()})
        });
});

router.get('/signin', auth.required, (req, res) => {
    const {payload: {id}} = req;

    const sendmail = require('sendmail')();

    sendmail({
        from: 'no-reply@yourdomain.com',
        to: 'anna.galaida@confirmit.com',
        subject: 'diploma',
        html: 'I can send e-mail from app:)',
    }, function(err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
    });

    (async () => {
        const user = await getUserById(id);
        if (!user) {
            return res.sendStatus(400);
        }

        const roles = (await Promise.all(
            user.roles.map(async (roleName) => {
                return await getRightsByName(roleName);
            })
        )).map(role => role.rights);
        const rights = mergeRoles(roles);
        return res.json({...user.toAuthJSON(), rights});
    })()
});

router.post('/signin', auth.optional, (req, res, next) => {
    const {body: {email, password}} = req;

    if (!email) {
        return res.status(422).json({email: {errorMessage: 'it is required'}});
    }
    if (!password) {
        return res.status(422).json({password: {errorMessage: 'it is required'}});
    }
    (async () => {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(422).json({email: {errorMessage: 'it is wrong'}});
        }

        return passport.authenticate('local', {session: false}, async (err, passportUser, info) => {
            if (err) {
                return res.status(500).json({err});
            }

            if (passportUser) {
                const finalUser = passportUser;
                finalUser.token = passportUser.generateJWT();

                const roles = (await Promise.all(
                    user.roles.map(async (roleName) => {
                        return await getRightsByName(roleName);
                    })
                )).map(role => role.rights);
                const rights = mergeRoles(roles);

                return res.json({...finalUser.toAuthJSON(), rights});
            }
            return res.status(422).json({password: {errorMessage: 'it is wrong'}});
        })(req, res, next);
    })()
});

module.exports = router;