import express from 'express'
import {
    addGroupOfUsers,
    deleteGroupOfUsers,
    getAllGroupsOfUsers,
    getGroupOfUsersById,
    getGroupsOfUsersByAuthorId,
    getGroupsOfUsersByParticipant,
    updateGroupOfUsers
} from '../mongoose/api/groupOfUsers'
import {getUserById, getUserRoleById} from '../mongoose/api/user'
import {getRightsByName} from '../mongoose/api/role'
import auth from '../config/auth'

const router = express.Router();

router.get('/', auth.required, async (req, res) => {
    const {payload: {id}} = req;
    const {role} = await getUserRoleById(id);
    const {rights} = await getRightsByName(role);
    let groups = [];
    if (rights.groupOfUsers.view) {
        groups = (await getAllGroupsOfUsers()).map(group => ({...group._doc, canEdit: true, canDelete: true}));
    } else {
        if (rights.groupOfUsers.add) {
            groups = (await getGroupsOfUsersByAuthorId(id)).map(group => ({
                ...group._doc,
                canEdit: true,
                canDelete: true
            }));
            //TODO: union with can read {canEdit: false, canDelete: false}
            //TODO: union with can write {canEdit: true, canDelete: false}
        } else {
            groups = (await getGroupsOfUsersByParticipant(id)).map(group => ({
                ...group._doc,
                canEdit: false,
                canDelete: false
            }));
        }
    }
    return res.json({groups});
});

router.get('/:groupId', auth.required, async (req, res) => {
    const {payload: {id}} = req;
    const {role} = await getUserRoleById(id);
    const {rights} = await getRightsByName(role);

    const group = await getGroupOfUsersById(req.params.groupId);
    if (!group) return res.status(404).end();   // TODO: check for converting to ObjectId

    const canView = rights.groupOfUsers.view || id === group.authorId || group.users.includes(id);
    if (canView) {
        const usersFullInfo = await Promise.all(
            group.users.map(async userId => {
                return await getUserById(userId);
            })
        );
        return res.json({group: {id: group._id, name: group.name, users: usersFullInfo}})
    } else {
        return res.status(403).end();
    }
});

router.post('/', auth.required, async (req, res) => {
    const {body: {group}, payload: {id}} = req;
    const {role} = await getUserRoleById(id);
    const {rights} = await getRightsByName(role);

    if (rights.groupOfUsers.add) {
        group.authorId = id;
        await addGroupOfUsers(group);
        return res.status(200).end();
    } else {
        return res.status(403).end();
    }
});

router.post('/:groupId', auth.required, async (req, res) => {
    const {body: {group}, params: {groupId}, payload: {id}} = req;
    const {role} = await getUserRoleById(id);
    const {rights} = await getRightsByName(role);

    const oldGroup = await getGroupOfUsersById(groupId);
    if (!oldGroup) return res.status(404).end();

    if (rights.groupOfUsers.edit || oldGroup.authorId === id) { // TODO: || can write
        await updateGroupOfUsers(groupId, group);
        return res.status(200).end();
    } else {
        return res.status(403).end();
    }
});

router.delete('/:groupId', auth.required, async (req, res) => {
    const {params: {groupId}, payload: {id}} = req;
    const {role} = await getUserRoleById(id);
    const {rights} = await getRightsByName(role);

    const group = await getGroupOfUsersById(groupId);
    if (!group) return res.status(404).end();

    if (rights.groupOfUsers.delete || group.authorId === id) {
        await deleteGroupOfUsers(groupId);
        return res.status(200).end();
    } else {
        return res.status(403).end();
    }
});

module.exports = router;