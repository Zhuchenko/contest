import express from 'express'
import { getGroupOfUsersById, addGroupOfUsers, updateGroupOfUsers, deleteGroupOfUsers } from '../mongoose/api/groupOfUsers'
import auth from '../config/auth'

const router = express.Router();

router.get('/verify-email', auth.required, (req, res) => {

    return getGroupOfUsersById(req.params.groupId).then((group, error) => {
        if (error) {
            return res.status(500).end()
        }
        return res.json({ group })
    })
});

router.post('/verify-email', auth.required, (req, res) => {
    addGroupOfUsers(req.body.group)
        .then(group => {
            return res.json({ group })
        });
});

router.get('/change-password', auth.required, (req, res) => {
    return getGroupOfUsersById(req.params.groupId).then((group, error) => {
        if (error) {
            return res.status(500).end()
        }
        return res.json({ group })
    })
});

router.post('/change-password', auth.required, (req, res) => {
    addGroupOfUsers(req.body.group)
        .then(group => {
            return res.json({ group })
        });
});

module.exports = router;