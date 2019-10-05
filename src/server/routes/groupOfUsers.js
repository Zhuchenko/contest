import express from 'express'
import { getGroupOfUsersById, addGroupOfUsers, updateGroupOfUsers, deleteGroupOfUsers } from '../mongoose/api/groupOfUsers'
import auth from '../config/auth'

const router = express.Router();

router.get('/:groupId', auth.required, (req, res) => {
    return getGroupOfUsersById(req.params.groupId).then((group, error) => {
        if (error) {
            return res.status(500).end()
        }
        return res.json({ group })
    })
});

router.post('/', auth.required, (req, res) => {
    addGroupOfUsers(req.body.group)
        .then(group => {
            return res.json({ group })
        });
});

router.post('/:groupId', auth.required, (req, res) => {
    const { body: {group}, params: { groupId }} = req;

    return getGroupOfUsersById(groupId)
        .then(foundGroup => {
            if(foundGroup) {
                updateGroupOfUsers(groupId, group)
                    .then(newGroup => {
                        return res.json({ group: newGroup })
                    })
            }
            else{
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