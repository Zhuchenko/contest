import express from 'express'
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
        let sets = [];
        if (rights.setOfProblems.view) {
            sets = await Promise.all((await db.getAllSets()).map(async set => {
                    const sharedReadRights = await Promise.all(set.sharedReadRights.map(async userId => (await db.getUserById(userId))));
                    const sharedWriteRights = await Promise.all(set.sharedWriteRights.map(async userId => (await db.getUserById(userId))));
                    return {
                        ...set,
                        sharedReadRights,
                        sharedWriteRights,
                        canEdit: true,
                        canDelete: true
                    }
                }
            ));
        } else {
            if (rights.setOfProblems.add) {
                const ownSets = await Promise.all((await db.getSetsByAuthor(id)).map(async set => {
                        const sharedReadRights = await Promise.all(set.sharedReadRights.map(async userId => (await db.getUserById(userId))));
                        const sharedWriteRights = await Promise.all(set.sharedWriteRights.map(async userId => (await db.getUserById(userId))));
                        return {
                            ...set,
                            sharedReadRights,
                            sharedWriteRights,
                            canEdit: true,
                            canDelete: true
                        }
                    }
                ));

                const sharedSetsForReading = (await db.getSetsByReadRight(id)).map(set => ({
                    ...set,
                    canEdit: false,
                    canDelete: false
                }));

                const sharedSetsForWriting = (await db.getSetsByWriteRight(id)).map(set => ({
                    ...set,
                    canEdit: true,
                    canDelete: false
                }));
                sets = [...ownSets, ...sharedSetsForReading, ...sharedSetsForWriting];
            } else {
                return res.status(403).end();
            }
        }
        return res.json({sets});
    } catch (error) {
        return res.status(500).json({error});
    }
});

router.get('/creating/problems', auth.required, async (req, res) => {
    const {payload: {id}} = req;
    let rights;
    try {
        rights = await db.getUserRights(id);
    } catch (e) {
        return res.status(400).json({e});
    }

    try {
        let problems = [];
        if (rights.setOfProblems.add) {
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
        } else {
            return res.status(403).end();
        }
        return res.json({problems});
    } catch (error) {
        return res.status(500).json({error});
    }
});

router.get('/:setId', auth.required, async (req, res) => {
    const {params: {setId}, payload: {id}} = req;
    let rights;
    try {
        rights = await db.getUserRights(id);
    } catch (e) {
        return res.status(400).json({e});
    }

    let set;
    try {
        set = await db.getSetById(setId);
    } catch (error) {
        return res.status(500).json({error});
    }
    if (!set) return res.status(404).end();

    try {
        const hasReadRight = await db.hasReadRightForTheSet(id, setId);
        const hasWriteRight = await db.hasReadRightForTheSet(id, setId);

        const canView = rights.setOfProblems.view || id === set.authorId || hasReadRight || hasWriteRight;
        if (canView) {
            const problemsFullInfo = await Promise.all(
                set.problems.map(async problemId => {
                    return await db.getProblemById(problemId);
                })
            );
            return res.json({set: {id: set.id, name: set.name, problems: problemsFullInfo}})
        } else {
            return res.status(403).end();
        }
    } catch (error) {
        return res.status(500).json({error});
    }
});

router.post('/', auth.required, async (req, res) => {
    const {body: {set}, payload: {id}} = req;
    let rights;
    try {
        rights = await db.getUserRights(id);
    } catch (e) {
        return res.status(400).json({e});
    }

    try {
        if (rights.setOfProblems.add) {
            set.authorId = id;
            set.sharedReadRights = [];
            set.sharedWriteRights = [];
            await db.addSet(set);
            return res.status(200).end();
        } else {
            return res.status(403).end();
        }
    } catch (error) {
        return res.status(500).json({error});
    }
});

router.post('/:setId', auth.required, async (req, res) => {
    const {body: {set}, params: {setId}, payload: {id}} = req;
    let rights;
    try {
        rights = await db.getUserRights(id);
    } catch (e) {
        return res.status(400).json({e});
    }

    let oldSet;
    try {
        oldSet = await db.getSetById(setId);
    } catch (error) {
        return res.status(500).json({error});
    }
    if (!oldSet) return res.status(404).end();

    try {
        const hasWriteRight = await db.hasReadRightForTheSet(id, setId);

        if (rights.setOfProblems.edit || oldSet.authorId === id || hasWriteRight) {
            await db.updateSet(setId, set);
            return res.status(200).end();
        } else {
            return res.status(403).end();
        }
    } catch (error) {
        return res.status(500).json({error});
    }
});

router.delete('/:setId', auth.required, async (req, res) => {
    const {params: {setId}, payload: {id}} = req;
    let rights;
    try {
        rights = await db.getUserRights(id);
    } catch (e) {
        return res.status(400).json({e});
    }

    let set;
    try {
        set = await db.getSetById(setId);
    } catch (error) {
        return res.status(500).json({error});
    }
    if (!set) return res.status(404).end();

    try {
        if (rights.setOfProblems.delete || set.authorId === id) {
            await db.deleteSet(setId);
            return res.status(200).end();
        } else {
            return res.status(403).end();
        }
    } catch (error) {
        return res.status(500).json({error});
    }
});

module.exports = router;