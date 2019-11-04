import express from 'express'
import * as db from '../mongoose/DatabaseHandler'
import auth from '../config/auth'

const router = express.Router();

router.get('/:problemId', auth.required, (req, res) => {
    return getProblemById(req.params.problemId).then((problem, error) => {
        if (error) {
            return res.status(500).end()
        }
        return res.json({problem})
    })
});

router.post('/', auth.required, async (req, res) => {
    const { body, files, payload: { id }} = req;
    let problem = JSON.parse(body.problem);
    const descriptions = JSON.parse(body.descriptions);

    let tests = [];
    for (let i = 0, l = descriptions.length; i < l; i++){
        tests.push({input: files['input'+i].data, output: files['output'+i].data, description: descriptions[i]})
    }
    problem.tests = tests;
    problem.authorId = id;
    problem.checker = files.checker.data;

    await db.addProblem(problem);
    return res.status(200).end();
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