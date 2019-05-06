import express from 'express'
import { getProblemById, addProblem, updateProblem, deleteProblem } from '../mongoose/api/problem'
import auth from './auth'

const router = express.Router();

router.get('/:problemId', auth.required, (req, res) => {
    return getProblemById(req.params.problemId).then((problem, error) => {
        if (error) {
            return res.status(500).end()
        }
        return res.json({problem})
    })
});

router.post('/', auth.required, (req, res) => {
    let { body: {problem}, payload: { id }} = req;
    problem.authorId = id;

    addProblem(problem)
        .then(addedProblem => {
            return res.json({ problem: addedProblem})
        });
});

router.post('/:problemId', auth.required, (req, res) => {
    const { body: {problem}, params: { problemId }} = req;

    return getProblemById(problemId)
        .then(foundProblem => {
            if(foundProblem) {
                updateProblem(problemId, problem)
                    .then(newProblem => {
                        return res.json({ problem: newProblem })
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