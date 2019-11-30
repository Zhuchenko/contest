import express from 'express'
import * as db from '../mongoose/DatabaseHandler'
import auth from '../config/auth'

const router = express.Router();

router.get('/', auth.required, async (req, res) => {
    const {payload: {id}} = req;
    const rights = await db.getUserRights(id);
    let problems = [];
    if (rights.problem.view) {
        problems = await Promise.all((await db.getAllProblems()).map(async problem => {
            const sharedReadRights = await Promise.all(problem.sharedReadRights.map(async userId => (await db.getUserById(userId))));
            const sharedWriteRights = await Promise.all(problem.sharedWriteRights.map(async userId => (await db.getUserById(userId))));
            return {
                ...problem,
                sharedReadRights,
                sharedWriteRights,
                canEdit: true,
                canDelete: true
            }
        }));
    } else {
        if (rights.problem.add) {//TODO: add users info to shareRights
            const ownProblems = await Promise.all((await db.getProblemsByAuthor(id)).map(async problem => {
                    const sharedReadRights = await Promise.all(problem.sharedReadRights.map(async userId => (await db.getUserById(userId))));
                    const sharedWriteRights = await Promise.all(problem.sharedWriteRights.map(async userId => (await db.getUserById(userId))));
                    return {
                        ...problem,
                        sharedReadRights,
                        sharedWriteRights,
                        canEdit: true,
                        canDelete: true
                    }
                }
            ));

            const sharedProblemsForReading = (await db.getProblemsByReadRight(id)).map(problem => ({
                ...problem,
                canEdit: true,
                canDelete: false
            }));

            const sharedProblemsForWriting = (await db.getProblemsByWriteRight(id)).map(problem => ({
                ...problem,
                canEdit: false,
                canDelete: false
            }));
            problems = [...ownProblems, ...sharedProblemsForReading, ...sharedProblemsForWriting];
        } else {
            return res.status(403).end();
        }
    }

    return res.json({problems});
});

router.get('/:problemId', auth.required, async (req, res) => {
    const {payload: {id}, params: {problemId}} = req;
    const rights = await db.getUserRights(id);

    const problem = await db.getProblemById(problemId);
    if (!problem) return res.status(404).end();   // TODO: check for converting to ObjectId
    const hasReadRight = await db.hasReadRightForTheProblem(id, problemId);
    const hasWriteRight = await db.hasReadRightForTheProblem(id, problemId);

    const canView = rights.problem.view || id === problem.authorId || hasReadRight || hasWriteRight;
    if (canView) {
        return res.json({problem})
    } else {
        return res.status(403).end();
    }
});

router.post('/', auth.required, async (req, res) => {
    const {body, files, payload: {id}} = req;
    const rights = await db.getUserRights(id);

    if (rights.problem.add) {
        let problem = JSON.parse(body.problem);
        const descriptions = JSON.parse(body.descriptions);

        let tests = [];
        for (let i = 0, l = descriptions.length; i < l; i++) {
            tests.push({input: files['input' + i].data, output: files['output' + i].data, description: descriptions[i]})
        }
        problem.tests = tests;
        problem.authorId = id;
        problem.checker = files.checker.data;
        problem.sharedReadRights = [];
        problem.sharedWriteRights = [];

        await db.addProblem(problem);
        return res.status(200).end();
    } else {
        return res.status(403).end();
    }
});

router.post('/:problemId', auth.required, async (req, res) => {
    const {body: {problem}, params: {problemId}, payload: {id}} = req;
    const rights = await db.getUserRights(id);

    const oldProblem = await db.getProblemById(req.params.problemId);
    if (!oldProblem) return res.status(404).end();   // TODO: check for converting to ObjectId
    const hasWriteRight = await db.hasReadRightForTheProblem(id, problemId);

    const canEdit = rights.problem.edit || id === problem.authorId || hasWriteRight;
    if (canEdit) {
        await db.updateProblem(problemId, problem);
        return res.status(200).end();
    } else {
        return res.status(403).end();
    }
});

router.delete('/:problemId', auth.required, async (req, res) => {
    const {params: {problemId}, payload: {id}} = req;
    const rights = await db.getUserRights(id);

    const problem = await db.getProblemById(problemId);
    if (!problem) return res.status(404).end();

    if (rights.problem.delete || problem.authorId === id) {
        await db.deleteProblem(problemId);
        return res.status(200).end();
    } else {
        return res.status(403).end();
    }
});

module.exports = router;