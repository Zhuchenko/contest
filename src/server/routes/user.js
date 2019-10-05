import express from 'express'
import { getAll, getUserById, updateUser, deleteUser } from '../mongoose/api/user'
import { addExpectedUser } from '../mongoose/api/expectedUser'
import auth from '../config/auth'

const router = express.Router();

router.get('/', auth.required, (req, res) => {
    return getAll().then((users, error) => {
        if (error) {
            return res.status(500).end()
        }
        return res.json({users})
    })
});

router.get('/:userId', auth.required, (req, res) => {
    return getUserById(req.params.userId).then((user, error) => {
        if (error) {
            return res.status(500).end()
        }
        return res.json({user})
    })
});

router.post('/:userId', auth.required, (req, res) => {
    const { body: {user}, params: { userId }} = req;

    return getUserById(userId)
        .then(newUser => {
            if(newUser) {
                updateUser(userId, user)
                    .then(newUser => {
                        return res.json({ user: newUser })
                    })
            }
            else{
                return res.status(500).end();
            }
        });
});

router.post('/add', auth.required, (req, res) => {
    const { body: {user}} = req;

    addExpectedUser(user);

    return res.status(200).end();

});

router.post('/add', auth.required, (req, res) => {
    const { body: {user}} = req;

    addExpectedUser(user)

    return res.status(200).end();

});

router.delete('/:userId', auth.required, (req, res) => {
    return deleteUser(req.params.userId)
        .then(() => {
            return res.status(200).end();
        })
});

module.exports = router;