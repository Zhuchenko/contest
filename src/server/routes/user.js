import express from 'express'
import {
    deleteUser,
    getAllParticipants,
    getAllUsers,
    getUserById,
    getUserRoleById,
    updateUser
} from '../mongoose/api/user'
import {
    addUnverifiedUser,
    deleteUnverifiedUser,
    getAllUnverifiedUsers,
    getUnverifiedUserById,
    updateUnverifiedUser
} from '../mongoose/api/unverifiedUser'
import {getRightsByName} from '../mongoose/api/role'
import auth from '../config/auth'
import pickBy from 'lodash/pickBy'

const isRole = (value, key) => key !== 'role';

const router = express.Router();
const ADMIN = "administrator";

router.get('/', auth.required, async (req, res) => {    // TODO: separated api point for unverified users
    const {payload: {id}} = req;
    const {role} = await getUserRoleById(id);
    const {rights} = await getRightsByName(role);
    if (rights.user.view) {
        const users = (await getAllUsers()).filter(user => {
            return user.role !== ADMIN
        });
        const unverifiedUsers = (await getAllUnverifiedUsers()).map(user => ({...user._doc, unverified: true}));
        return res.json({users: [...unverifiedUsers, ...users]});
    } else {
        return res.status(403).end();
    }
});

router.get('/:userId', auth.required, async (req, res) => { // TODO: coordinators can view only students
    // TODO: info about groups, contests
    const {params: {userId}, payload: {id}} = req;
    const {role} = await getUserRoleById(id);
    const {rights} = await getRightsByName(role);
    console.log()
    if (rights.user.view) {
        const user = await getUserById(userId);
        return res.json({user})
    } else {
        return res.status(403).end();
    }
});

router.get('/group-creating/participants', auth.required, async (req, res) => {
    const {payload: {id}} = req;
    const {role} = await getUserRoleById(id);
    const {rights} = await getRightsByName(role);

    if (rights.groupOfUsers.add) {
        const users = await getAllParticipants();
        return res.json({users});
    } else {
        return res.status(403).end();
    }
});

router.post('/:userId', auth.required, async (req, res) => {
    const {body: {user}, params: {userId}, payload: {id}} = req;
    const {role} = await getUserRoleById(id);
    const {rights} = await getRightsByName(role);

    const oldUser = await getUserById(userId);
    if (!oldUser) return res.status(404).end();

    if (rights.users.edit || oldUser.id === id) {
        if (!rights.user.changeRole) {
            await updateUser(userId, pickBy(user, isRole));
        } else {
            await updateUser(userId, user);
        }
        return res.status(200).end();
    } else {
        return res.status(403).end();
    }
});

router.delete('/:userId', auth.required, async (req, res) => {
    const {params: {userId}, payload: {id}} = req;
    const {role} = await getUserRoleById(id);
    const {rights} = await getRightsByName(role);

    const user = await getUserById(userId);
    if (!user) return res.status(404).end();

    if (rights.user.delete) {
        await deleteUser(userId);
        return res.status(200).end();
    } else {
        return res.status(403).end();
    }
});

router.post('/', auth.required, async (req, res) => {
    const {body: {user}, payload: {id}} = req;
    const {role} = await getUserRoleById(id);
    const {rights} = await getRightsByName(role);

    if (rights.user.add) {
        await addUnverifiedUser(user);
        return res.status(200).end();
    } else {
        return res.status(403).end();
    }
})
;

router.get('/unverified/:userId', auth.required, async (req, res) => {
    const {params: {userId}, payload: {id}} = req;
    const {role} = await getUserRoleById(id);
    const {rights} = await getRightsByName(role);

    if (rights.user.add) {
        const user = await getUnverifiedUserById(userId);
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
    const {role} = await getUserRoleById(id);
    const {rights} = await getRightsByName(role);

    const oldUser = await getUnverifiedUserById(userId);
    if (!oldUser) return res.status(404).end();

    if (rights.user.add) {
        await updateUnverifiedUser(userId, user);
        return res.status(200).end()
    } else {
        return res.status(403).end();
    }
});

router.delete('/unverified/:userId', auth.required, async (req, res) => {
    const {params: {userId}, payload: {id}} = req;
    const {role} = await getUserRoleById(id);
    const {rights} = await getRightsByName(role);

    const user = await getUnverifiedUserById(userId);
    if (!user) return res.status(404).end();

    if (rights.user.add) {
        await deleteUnverifiedUser(userId);
        return res.status(200).end()
    } else {
        return res.status(403).end();
    }
});

module.exports = router;