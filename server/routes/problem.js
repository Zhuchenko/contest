import express from 'express'
import { getProblemById, addProblem, updateProblem, deleteProblem } from '../mongoose/api/problem'
import auth from './auth'

const router = express.Router();

router.get('/:problemId', auth.required, (req, res) => {
    return getProblemById(req.params.problemId).then((problem, error) => {
        if (error) {
            return res.status(500).end()
        }
        res.json({problem})
    })
});

router.post('/', auth.required, (req, res) => {
    addProblem(req.body.problem)
        .then(problem => {
            return res.json({problem})
        });
});

router.post('/:problemId', auth.required, (req, res) => {
    return getProblemById(req.params.problemId)
        .then(problem => {
            if(problem) {
                updateProblem(req.params.problemId, req.body.problem)
                    .then(problem => {
                        return res.json({ problem })
                    })
            }
            else{
                return res.status(500).end();
            }
        });
});

router.delete('/:problemId', auth.required, (req, res) => {
    return deleteProblem(req.params.problemId)
        .then(() => {
            return res.status(200).end();
        })
});

module.exports = router;