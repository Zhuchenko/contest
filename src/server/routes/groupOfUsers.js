import express from 'express'
import * as db from '../mongoose/DatabaseHandler'
import auth from '../config/auth'

const router = express.Router();

router.get('/', auth.required, async (req, res) => {
    const {payload: {id}} = req;
    const rights = await db.getUserRights(id);
    let groups = [];
    if (rights.groupOfUsers.view) {
        groups = (await db.getAllGroups()).map(group => ({...group, canEdit: true, canDelete: true}));
    } else {
        if (rights.groupOfUsers.add) {
            const ownGroups = (await db.getGroupsByAuthor(id)).map(group => ({
                ...group,
                canEdit: true,
                canDelete: true
            }));

            const sharedGroupsForReading = (await db.getGroupsByReadRight(id)).map(group => ({
                ...group,
                canEdit: true,
                canDelete: false
            }));

            const sharedGroupsForWriting = (await db.getGroupsByWriteRight(id)).map(group => ({
                ...group,
                canEdit: false,
                canDelete: false
            }));
            groups = [... ownGroups, ...sharedGroupsForReading, ...sharedGroupsForWriting];
        } else {
            groups = (await db.getGroupsByParticipant(id)).map(group => ({
                ...group,
                canEdit: false,
                canDelete: false
            }));
        }
    }
    return res.json({groups});
});

router.get('/creating/users', auth.required, async (req, res) => {
    const {payload: {id}} = req;
    const rights = await db.getUserRights(id);

    if (rights.groupOfUsers.add) {
        const users = await db.getAllParticipants();
        return res.json({users});
    } else {
        return res.status(403).end();
    }
});

router.get('/:groupId', auth.required, async (req, res) => {
    const {params: {groupId}, payload: {id}} = req;
    const rights = await db.getUserRights(id);

    const group = await db.getGroupById(groupId);
    if (!group) return res.status(404).end();   // TODO: check for converting to ObjectId
    const hasReadRight = await db.hasReadRightForTheGroup(id, groupId);
    const hasWriteRight = await db.hasReadRightForTheGroup(id, groupId);

    const canView = rights.groupOfUsers.view || id === group.authorId || group.users.includes(id) || hasReadRight || hasWriteRight;
    if (canView) {
        const usersFullInfo = await Promise.all(
            group.users.map(async userId => {
                return await db.getUserById(userId);
            })
        );
        return res.json({group: {id: group.id, name: group.name, users: usersFullInfo}})
    } else {
        return res.status(403).end();
    }
});

router.post('/', auth.required, async (req, res) => {
    const {body: {group}, payload: {id}} = req;
    const rights = await db.getUserRights(id);

    if (rights.groupOfUsers.add) {
        group.authorId = id;
        group.sharedRights = [];
        group.sharedReadRights = [];
        group.sharedWriteRights = [];
        await db.addGroup(group);
        return res.status(200).end();
    } else {
        return res.status(403).end();
    }
});

router.post('/:groupId', auth.required, async (req, res) => {
    const {body: {group}, params: {groupId}, payload: {id}} = req;
    const rights = await db.getUserRights(id);

    const oldGroup = await db.getGroupById(groupId);
    if (!oldGroup) return res.status(404).end();
    const hasWriteRight = await db.hasReadRightForTheGroup(id, groupId);

    if (rights.groupOfUsers.edit || oldGroup.authorId === id || hasWriteRight) {
        await db.updateGroup(groupId, group);
        return res.status(200).end();
    } else {
        return res.status(403).end();
    }
});

router.delete('/:groupId', auth.required, async (req, res) => {
    const {params: {groupId}, payload: {id}} = req;
    const rights = await db.getUserRights(id);

    const group = await db.getGroupById(groupId);
    if (!group) return res.status(404).end();

    if (rights.groupOfUsers.delete || group.authorId === id) {
        await db.deleteGroup(groupId);
        return res.status(200).end();
    } else {
        return res.status(403).end();
    }
});

module.exports = router;