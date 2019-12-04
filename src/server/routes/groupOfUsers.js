import express from 'express'
import * as db from '../mongoose/DatabaseHandler'
import auth from '../config/auth'

const router = express.Router();

router.get('/', auth.required, async (req, res) => {
    const {payload: {id}} = req;

    let rights;
    try {
        rights = await db.getUserRights(id);
    } catch (e) {
        return res.status(400).json({e});
    }

    try {
        let groups = [];
        if (rights.groupOfUsers.view) {
            groups = await Promise.all((await db.getAllGroups()).map(async group => {
                    const sharedReadRights = await Promise.all(group.sharedReadRights.map(async userId => (await db.getUserById(userId))));
                    const sharedWriteRights = await Promise.all(group.sharedWriteRights.map(async userId => (await db.getUserById(userId))));
                    return {
                        ...group,
                        sharedReadRights,
                        sharedWriteRights,
                        canEdit: true,
                        canDelete: true
                    }
                }
            ));
        } else {
            if (rights.groupOfUsers.add) {
                const ownGroups = await Promise.all((await db.getGroupsByAuthor(id)).map(async group => {
                        const sharedReadRights = await Promise.all(group.sharedReadRights.map(async userId => (await db.getUserById(userId))));
                        const sharedWriteRights = await Promise.all(group.sharedWriteRights.map(async userId => (await db.getUserById(userId))));
                        return {
                            ...group,
                            sharedReadRights,
                            sharedWriteRights,
                            canEdit: true,
                            canDelete: true
                        }
                    }
                ));

                const sharedGroupsForReading = (await db.getGroupsByReadRight(id)).map(group => ({
                    ...group,
                    canEdit: false,
                    canDelete: false
                }));

                const sharedGroupsForWriting = (await db.getGroupsByWriteRight(id)).map(group => ({
                    ...group,
                    canEdit: true,
                    canDelete: false
                }));
                groups = [...ownGroups, ...sharedGroupsForReading, ...sharedGroupsForWriting];
            } else {
                groups = (await db.getGroupsByParticipant(id)).map(group => ({
                    ...group,
                    canEdit: false,
                    canDelete: false
                }));
            }
        }
        return res.json({groups});
    } catch (error) {
        return res.status(500).json({error});
    }
});
router.get('/creating/users', auth.required, async (req, res) => {
    const {payload: {id}} = req;
    let rights;
    try {
        rights = await db.getUserRights(id);
    } catch (e) {
        return res.status(400).json({e});
    }

    try {
        if (rights.groupOfUsers.add) {
            const users = await db.getAllParticipants();
            return res.json({users});
        } else {
            return res.status(403).end();
        }
    } catch (error) {
        return res.status(500).json({error});
    }
});

router.get('/:groupId', auth.required, async (req, res) => {
    const {params: {groupId}, payload: {id}} = req;
    let rights;
    try {
        rights = await db.getUserRights(id);
    } catch (e) {
        return res.status(400).json({e});
    }

    let group;
    try {
        group = await db.getGroupById(groupId);
    } catch (error) {
        return res.status(500).json({error});
    }
    if (!group) return res.status(404).end();

    try {
        const hasReadRight = await db.hasReadRightForTheGroup(id, groupId);
        const hasWriteRight = await db.hasWriteRightForTheGroup(id, groupId);

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
    } catch (error) {
        return res.status(500).json({error});
    }
});

router.post('/', auth.required, async (req, res) => {
    const {body: {group}, payload: {id}} = req;
    let rights;
    try {
        rights = await db.getUserRights(id);
    } catch (e) {
        return res.status(400).json({e});
    }

    try {
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
    } catch (error) {
        return res.status(500).json({error});
    }
});

router.post('/:groupId', auth.required, async (req, res) => {
    const {body: {group}, params: {groupId}, payload: {id}} = req;
    let rights;
    try {
        rights = await db.getUserRights(id);
    } catch (e) {
        return res.status(400).json({e});
    }

    let oldGroup;
    try {
        oldGroup = await db.getGroupById(groupId);
    } catch (error) {
        return res.status(500).json({error});
    }
    if (!oldGroup) return res.status(404).end();

    try {
        const hasWriteRight = await db.hasWriteRightForTheGroup(id, groupId);

        if (rights.groupOfUsers.edit || oldGroup.authorId === id || hasWriteRight) {
            await db.updateGroup(groupId, group);
            return res.status(200).end();
        } else {
            return res.status(403).end();
        }
    } catch (error) {
        return res.status(500).json({error});
    }
});

router.delete('/:groupId', auth.required, async (req, res) => {
    const {params: {groupId}, payload: {id}} = req;
    let rights;
    try {
        rights = await db.getUserRights(id);
    } catch (e) {
        return res.status(400).json({e});
    }

    let group;
    try {
        group = await db.getGroupById(groupId);
    } catch (error) {
        return res.status(500).json({error});
    }
    if (!group) return res.status(404).end();

    try {
        if (rights.groupOfUsers.delete || group.authorId === id) {
            await db.deleteGroup(groupId);
            return res.status(200).end();
        } else {
            return res.status(403).end();
        }
    } catch (error) {
        return res.status(500).json({error});
    }
});

module.exports = router;