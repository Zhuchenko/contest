import express from 'express'
import { getSetOfProblemsById, addSetOfProblems, updateSetOfProblems, deleteSetOfProblems } from '../mongoose/api/setOfProblems'
import auth from '../config/auth'

const router = express.Router();

router.get('/:setId', auth.required, (req, res) => {
    return getSetOfProblemsById(req.params.setId).then((set, error) => {
        if (error) {
            return res.status(500).end()
        }
        return res.json({set})
    })
});

router.post('/', auth.required, (req, res) => {
    let { body: {set}, payload: { id }} = req;
    set.authorId = id;

    addSetOfProblems(set)
        .then(addedSet => {
            return res.json({ set: addedSet})
        });
});

router.post('/:setId', auth.required, (req, res) => {
    const { body: {set}, params: { setId }} = req;

    return getSetOfProblemsById(setId)
        .then(foundSet => {
            if(foundSet) {
                updateSetOfProblems(setId, set)
                    .then(newSet => {
                        return res.json({ set: newSet })
                    })
            }
            else{
                return res.status(500).end();
            }
        });
});

router.delete('/:setId', auth.required, (req, res) => {
    return deleteSetOfProblems(req.params.setId)
        .then(() => {
            return res.status(200).end();
        })
});

module.exports = router;