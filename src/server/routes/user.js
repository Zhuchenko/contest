import express from 'express'
import { getAll, getUserById, updateUser, deleteUser } from '../mongoose/api/user'
import { getAllUnverifiedUsers, addUnverifiedUser, getUnverifiedUserById, updateUnverifiedUser, deleteUnverifiedUser } from '../mongoose/api/unverifiedUser'
import auth from '../config/auth'

const router = express.Router();

router.get('/', auth.required, async (req, res) => {
    const users = (await getAll()).filter(user => {return user.role != "administrator"});
    const unverifiedUsers = (await getAllUnverifiedUsers()).map(user => ({...user._doc, unverified: true}));
    return res.json({users: [...unverifiedUsers, ...users]});
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

router.delete('/:userId', auth.required, (req, res) => {
    return deleteUser(req.params.userId)
        .then(() => {
            return res.status(200).end();
        })
});

router.post('/', auth.required, (req, res) => {
    const { body: {user}} = req;

    (async () => {
        await addUnverifiedUser(user);

        return res.status(200).end();
    })()
});

router.get('/unverified/:userId', auth.required, (req, res) => {
    return getUnverifiedUserById(req.params.userId).then((user, error) => {
        if (error) {
            return res.status(500).end()
        }
        return res.json({user})
    })
});

router.post('/unverified/:userId', auth.required, (req, res) => {
    const { body: {user}, params: { userId }} = req;

    return getUnverifiedUserById(userId)
        .then(foundUser => {
            if(foundUser) {
                updateUnverifiedUser(userId, user)
                    .then(() => {
                        return res.status(200).end()
                    })
            }
            else{
                return res.status(500).end();
            }
        });
});

router.delete('/unverified/:userId', auth.required, (req, res) => {
    return deleteUnverifiedUser(req.params.userId)
        .then(() => {
            return res.status(200).end();
        })
});

module.exports = router;