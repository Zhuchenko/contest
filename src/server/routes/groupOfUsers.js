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
            groups = (await  db.getGroupsByAuthor(id)).map(group => ({
                ...group,
                canEdit: true,
                canDelete: true
            }));
            //TODO: union with can read {canEdit: false, canDelete: false}
            //TODO: union with can write {canEdit: true, canDelete: false}
        } else {
            groups = (await  db.getGroupsByParticipant(id)).map(group => ({
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

    const group = await  db.getGroupById(groupId);
    if (!group) return res.status(404).end();   // TODO: check for converting to ObjectId

    const canView = rights.groupOfUsers.view || id === group.authorId || group.users.includes(id);
    if (canView) {
        const usersFullInfo = await Promise.all(
            group.users.map(async userId => {
                return await  db.getUserById(userId);
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
        await  db.addGroup(group);
        return res.status(200).end();
    } else {
        return res.status(403).end();
    }
});

router.post('/:groupId', auth.required, async (req, res) => {
    const {body: {group}, params: {groupId}, payload: {id}} = req;
    const rights = await db.getUserRights(id);

    const oldGroup = await  db.getGroupById(groupId);
    if (!oldGroup) return res.status(404).end();

    if (rights.groupOfUsers.edit || oldGroup.authorId === id) { // TODO: || can write
        await db.updateGroup(groupId, group);
        return res.status(200).end();
    } else {
        return res.status(403).end();
    }
});

router.delete('/:groupId', auth.required, async (req, res) => {
    const {params: {groupId}, payload: {id}} = req;
    const rights = await db.getUserRights(id);

    const group = await  db.getGroupById(groupId);
    if (!group) return res.status(404).end();

    if (rights.groupOfUsers.delete || group.authorId === id) {
        await  db.deleteGroup(groupId);
        return res.status(200).end();
    } else {
        return res.status(403).end();
    }
});

module.exports = router;