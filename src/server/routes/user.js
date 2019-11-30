import express from 'express'
import {getUserById} from '../mongoose/api/user'
import auth from '../config/auth'
import pickBy from 'lodash/pickBy'
import * as db from "../mongoose/DatabaseHandler";

const isNotRole = (value, key) => key !== 'role';

const router = express.Router();
const ADMIN = "administrator";

router.get('/', auth.required, async (req, res) => {    // TODO: separated api point for unverified users
    const {payload: {id}} = req;
    const rights = await db.getUserRights(id);
    if (rights.user.view) {
        const users = (await db.getAllUsers()).filter(user => {
            return user.role !== ADMIN
        });
        const unverifiedUsers = (await db.getAllUnverifiedUsers()).map(user => ({...user, unverified: true}));
        return res.json({users: [...unverifiedUsers, ...users]});
    } else {
        return res.status(403).end();
    }
});

router.get('/:userId', auth.required, async (req, res) => { // TODO: coordinators can view only students
    // TODO: info about groups, contests
    const {params: {userId}, payload: {id}} = req;
    const rights = await db.getUserRights(id);

    if (rights.user.view) {
        const user = await getUserById(userId);
        return res.json({user})
    } else {
        return res.status(403).end();
    }
});

router.post('/:userId', auth.required, async (req, res) => {
    const {body: {user}, params: {userId}, payload: {id}} = req;
    const rights = await db.getUserRights(id);

    const oldUser = await getUserById(userId);
    if (!oldUser) return res.status(404).end();

    if (rights.users.edit || oldUser.id === id) {
        if (!rights.user.changeRole) {
            await db.updateUser(userId, pickBy(user, isNotRole));
        } else {
            await db.updateUser(userId, user);
        }
        return res.status(200).end();
    } else {
        return res.status(403).end();
    }
});

router.delete('/:userId', auth.required, async (req, res) => {
    const {params: {userId}, payload: {id}} = req;
    const rights = await db.getUserRights(id);

    const user = await db.getUserById(userId);
    if (!user) return res.status(404).end();

    if (rights.user.delete) {
        await db.deleteUser(userId);
        return res.status(200).end();
    } else {
        return res.status(403).end();
    }
});

router.get('/share-rights/coordinators', auth.required, async (req, res) => {
    const {payload: {id}} = req;
    const rights = await db.getUserRights(id);
    const isCoordinator = await db.isCoordinator(id);

    if (rights.user.view || isCoordinator) {
        const coordinators = await db.getAllCoordinators();
        return res.json({coordinators})
    } else {
        return res.status(403).end();
    }
});

router.post('/', auth.required, async (req, res) => {
    const {body: {user}, payload: {id}} = req;
    const rights = await db.getUserRights(id);

    if (rights.user.add) {
        await db.addUnverifiedUser(user);
        return res.status(200).end();
    } else {
        return res.status(403).end();
    }
})
;

router.get('/unverified/:userId', auth.required, async (req, res) => {
    const {params: {userId}, payload: {id}} = req;
    const rights = await db.getUserRights(id);

    if (rights.user.add) {
        const user = await db.getUnverifiedUserById(userId);
        if (user) {
            return res.json({user})
        } else {
            return res.status(404).end();
        }
    } else {
        return res.status(403).end();
    }
});

router.post('/unverified/:userId', auth.required, async (req, res) => {
    const {body: {user}, params: {userId}, payload: {id}} = req;
    const rights = await db.getUserRights(id);

    const oldUser = await db.getUnverifiedUserById(userId);
    if (!oldUser) return res.status(404).end();

    if (rights.user.add) {
        await db.updateUnverifiedUser(userId, user);
        return res.status(200).end()
    } else {
        return res.status(403).end();
    }
});

router.delete('/unverified/:userId', auth.required, async (req, res) => {
    const {params: {userId}, payload: {id}} = req;
    const rights = await db.getUserRights(id);

    const user = await db.getUnverifiedUserById(userId);
    if (!user) return res.status(404).end();

    if (rights.user.add) {
        await db.deleteUnverifiedUser(userId);
        return res.status(200).end()
    } else {
        return res.status(403).end();
    }
});

module.exports = router;