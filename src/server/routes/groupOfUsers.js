import express from 'express'
import {
    addGroupOfUsers,
    deleteGroupOfUsers,
    getAllGroupsOfUsers,
    getGroupOfUsersById,
    updateGroupOfUsers
} from '../mongoose/api/groupOfUsers'
import {getAllParticipants, getUserById} from '../mongoose/api/user'
import auth from '../config/auth'

const router = express.Router();

router.get('/', auth.required, async (req, res) => {
    const groups = await getAllGroupsOfUsers();
    return res.json({groups});
});

router.get('/:groupId', auth.required, async (req, res) => {
    const {_id, name, users} = await getGroupOfUsersById(req.params.groupId);
    const usersFullInfo = await Promise.all(
        users.map(async userId => {
            return await getUserById(userId);
        })
    );
    return res.json({group: {_id, name, users: usersFullInfo}})
});

router.get('/creating/users', auth.required, (req, res) => {
    return getAllParticipants()
        .then(users => {
            return res.json({users})
        })
});

router.post('/', auth.required, (req, res) => {
    addGroupOfUsers(req.body.group)
        .then(group => {
            return res.json({group})
        });
});

router.post('/:groupId', auth.required, (req, res) => {
    const {body: {group}, params: {groupId}} = req;

    return getGroupOfUsersById(groupId)
        .then(foundGroup => {
            if (foundGroup) {
                updateGroupOfUsers(groupId, group)
                    .then(newGroup => {
                        return res.json({group: newGroup})
                    })
            } else {
                return res.status(500).end();
            }
        });
});

router.delete('/:groupId', auth.required, (req, res) => {
    return deleteGroupOfUsers(req.params.groupId)
        .then(() => {
            return res.status(200).end();
        })
});

module.exports = router;