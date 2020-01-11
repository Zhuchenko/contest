import express from 'express'
import fetch from 'node-fetch'
import * as db from '../mongoose/DatabaseHandler'
import auth from '../config/auth'

const router = express.Router();

router.get('/', auth.required, async (req, res) => {
    const {payload: {id}} = req;
    let rights;
    try {
        rights = await db.getUserRights(id);
    } catch (e) {
        return res.status(400).json({e});
    }

    try {
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
            if (rights.problem.add) {
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
                    canEdit: false,
                    canDelete: false
                }));

                const sharedProblemsForWriting = (await db.getProblemsByWriteRight(id)).map(problem => ({
                    ...problem,
                    canEdit: true,
                    canDelete: false
                }));
                problems = [...ownProblems, ...sharedProblemsForReading, ...sharedProblemsForWriting];
            } else {
                return res.status(403).end();
            }
        }
        return res.json({problems});
    } catch (error) {
        return res.status(500).json({error});
    }
});

router.get('/:problemId', auth.required, async (req, res) => {
    const {payload: {id}, params: {problemId}} = req;
    let rights;
    try {
        rights = await db.getUserRights(id);
    } catch (e) {
        return res.status(400).json({e});
    }

    let problem;
    try {
        problem = await db.getProblemById(problemId);
    } catch (error) {
        return res.status(500).json({error});
    }
    if (!problem) return res.status(404).end();

    try {
        const hasReadRight = await db.hasReadRightForTheProblem(id, problemId);
        const hasWriteRight = await db.hasWriteRightForTheProblem(id, problemId);

        const canView = rights.problem.view || id === problem.authorId || hasReadRight || hasWriteRight;
        if (canView) {
            return res.json({problem})
        } else {
            return res.status(403).end();
        }
    } catch (error) {
        return res.status(500).json({error});
    }
});

router.post('/', auth.required, async (req, res) => {
    const {body, files, payload: {id}} = req;
    let rights;
    try {
        rights = await db.getUserRights(id);
    } catch (e) {
        return res.status(400).json({e});
    }

    try {
        if (rights.problem.add) {
            const generator = files.generator.data;
            let problem = JSON.parse(body.problem);
            const descriptions = JSON.parse(body.descriptions);

            let inputs = [];
            for (let i = 0, l = descriptions.length; i < l; i++) {
                inputs.push({
                    input: Array.from(files['test' + i].data),
                    number: i + 1
                });
            }

            const outputs = await fetch('http://localhost:51786/api/generate_tests', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    generator: Array.from(generator),
                    tests: inputs,
                    language: problem.languages[0], //TODO
                    timeLimit: problem.limitation.time,
                    memoryLimit: problem.limitation.memory,
                })
            }).then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw response.status
                }
            });

            let tests = [];
            for (let i = 0, l = descriptions.length; i < l; i++) {
                tests.push({
                    input: files['test' + i].data,
                    output: outputs.results[i],
                    description: descriptions[i]
                });
            }

            problem.tests = tests;
            problem.authorId = id;
            problem.checker = files.checker.data;
            problem.generator = files.generator.data;
            problem.sharedReadRights = [];
            problem.sharedWriteRights = [];

            await db.addProblem(problem);
            return res.status(200).end();
        } else {
            return res.status(403).end();
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({error});
    }
});

router.post('/:problemId', auth.required, async (req, res) => {
    const {body: {problem}, params: {problemId}, payload: {id}} = req;
    let rights;
    try {
        rights = await db.getUserRights(id);
    } catch (e) {
        return res.status(400).json({e});
    }

    let oldProblem;
    try {
        oldProblem = await db.getProblemById(problemId);
    } catch (error) {
        return res.status(500).json({error});
    }
    if (!oldProblem) return res.status(404).end();

    try {
        const hasWriteRight = await db.hasWriteRightForTheProblem(id, problemId);

        const canEdit = rights.problem.edit || id === problem.authorId || hasWriteRight;
        if (canEdit) {
            await db.updateProblem(problemId, problem);
            return res.status(200).end();
        } else {
            return res.status(403).end();
        }
    } catch (error) {
        return res.status(500).json({error});
    }
});

router.delete('/:problemId', auth.required, async (req, res) => {
    const {params: {problemId}, payload: {id}} = req;
    let rights;
    try {
        rights = await db.getUserRights(id);
    } catch (e) {
        return res.status(400).json({e});
    }

    let problem;
    try {
        problem = await db.getProblemById(problemId);
    } catch (error) {
        return res.status(500).json({error});
    }
    if (!problem) return res.status(404).end();

    const sets = await db.getAllSetsByQuery({problems: problemId});
    for (let i = 0; i < sets.length; i++) {
        const p = sets[i].problems;
        const index = p.indexOf(problemId);
        if (index !== -1) p.splice(index, 1);
        await db.updateSet(sets[i].id, {problems: p});
    }

    try {
        if (rights.problem.delete || problem.authorId === id) {
            await db.deleteProblem(problemId);
            return res.status(200).end();
        } else {
            return res.status(403).end();
        }
    } catch (error) {
        return res.status(500).json({error});
    }
});

module.exports = router;