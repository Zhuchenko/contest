import express from 'express'
import * as db from '../mongoose/DatabaseHandler'
import auth from '../config/auth'

const router = express.Router();

router.get('/', auth.required, async (req, res) => {
    const {payload: {id}} = req;
    const rights = await db.getUserRights(id);
    let sets = [];
    if (rights.setOfProblems.view) {
        sets = (await db.getAllSets()).map(set => ({...set, canEdit: true, canDelete: true}));
    } else {
        if (rights.setOfProblems.add) {
            sets = (await  db.getSetsByAuthor(id)).map(set => ({
                ...set,
                canEdit: true,
                canDelete: true
            }));
            //TODO: union with can read {canEdit: false, canDelete: false}
            //TODO: union with can write {canEdit: true, canDelete: false}
        } else {
            return res.status(403).end();
        }
    }
    return res.json({sets});
});

router.get('/:setId', auth.required, async (req, res) => {
    const {params: {setId}, payload: {id}} = req;
    const rights = await db.getUserRights(id);

    const set = await  db.getSetById(setId);
    if (!set) return res.status(404).end();   // TODO: check for converting to ObjectId

    const canView = rights.setOfProblems.view || id === set.authorId;
    if (canView) {
        const problemsFullInfo = await Promise.all(
            set.problems.map(async problemId => {
                return await  db.getProblemById(problemId);
            })
        );
        return res.json({set: {id: set.id, name: set.name, problems: problemsFullInfo}})
    } else {
        return res.status(403).end();
    }
});

router.post('/', auth.required, async (req, res) => {
    const {body: {set}, payload: {id}} = req;
    const rights = await db.getUserRights(id);

    if (rights.setOfProblems.add) {
        set.authorId = id;
        await  db.addSet(set);
        return res.status(200).end();
    } else {
        return res.status(403).end();
    }
});

router.post('/:setId', auth.required, async (req, res) => {
    const {body: {set}, params: {setId}, payload: {id}} = req;
    const rights = await db.getUserRights(id);

    const oldSet = await  db.getSetById(setId);
    if (!oldSet) return res.status(404).end();

    if (rights.setOfProblems.edit || oldSet.authorId === id) { // TODO: || can write
        await db.updateSet(setId, set);
        return res.status(200).end();
    } else {
        return res.status(403).end();
    }
});

router.delete('/:setId', auth.required, async (req, res) => {
    const {params: {setId}, payload: {id}} = req;
    const rights = await db.getUserRights(id);

    const set = await  db.getSetById(setId);
    if (!set) return res.status(404).end();

    if (rights.setOfProblems.delete || set.authorId === id) {
        await  db.deleteSet(setId);
        return res.status(200).end();
    } else {
        return res.status(403).end();
    }
});

module.exports = router;