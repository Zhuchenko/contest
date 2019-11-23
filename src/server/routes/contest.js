import express from 'express'
import auth from '../config/auth'
import flatten from 'lodash/flatten'
import * as db from "../mongoose/DatabaseHandler";

const router = express.Router();

router.get('/', auth.required, async (req, res) => {
    const {payload: {id}} = req;
    const rights = await db.getUserRights(id);
    let contests = [];
    if (rights.contest.view) {
        contests = (await db.getAllContests()).map(contest => ({...contest, canEdit: true, canDelete: true}));
    } else {
        if (rights.contest.add) {
            contests = (await db.getContestsByAuthor(id)).map(contest => ({
                ...contest,
                canEdit: true,
                canDelete: true
            }));
            //TODO: union with can read {canEdit: false, canDelete: false}
            //TODO: union with can write {canEdit: true, canDelete: false}
        } else {
            contests = (await db.getContestsByParticipant(id)).map(group => ({
                ...group,
                canEdit: false,
                canDelete: false
            }));
        }
    }
    return res.json({contests});
});

router.get('/creating/groups', auth.required, async (req, res) => {
    const {payload: {id}} = req;
    const rights = await db.getUserRights(id);

    let groups = [];
    if (rights.contest.add) {
        if (rights.groupOfUsers.view) {
            groups = (await db.getAllGroups()).map(({id, name}) => ({id, name}));
        } else {
            if (rights.groupOfUsers.add) {
                groups = (await db.getGroupsByAuthor(id)).map(({id, name}) => ({
                    id, name
                }));
            } else {
                return res.status(403).end();
            }
        }
    } else {
        return res.status(403).end();
    }

    return res.json({groups});
});

router.get('/creating/sets', auth.required, async (req, res) => {
    const {payload: {id}} = req;
    const rights = await db.getUserRights(id);

    let sets = [];
    if (rights.contest.add) {
        if (rights.setOfProblems.view) {
            sets = (await db.getAllSets()).map(({id, name}) => ({id, name}));
        } else {
            if (rights.setOfProblems.add) {
                sets = (await db.getSetsByAuthor(id)).map(({id, name}) => ({id, name}));
            } else {
                return res.status(403).end();
            }
        }
    } else {
        return res.status(403).end();
    }

    return res.json({sets});
});

router.get('/:contestId', auth.required, async (req, res) => { //TODO: get
    const {params: {contestId}, payload: {id}} = req;
    const rights = await db.getUserRights(id);

    const contest = await db.getContestById(contestId);
    if (!contest) return res.status(404).end();   // TODO: check for converting to ObjectId

    const canView = rights.contest.view || id === contest.authorId// || contest.participants.includes(id); //TODO: contest.participants.includes(id)
    if (canView) { //TODO: full info
        // const usersFullInfo = await Promise.all(
        //     group.users.map(async userId => {
        //         return await  db.getUserById(userId);
        //     })
        // );
        return res.json({group: {id: group.id, name: group.name, /*users: usersFullInfo*/}})
    } else {
        return res.status(403).end();
    }
});

router.post('/', auth.required, async (req, res) => {
    const {body: {contest}, payload: {id}} = req;
    const rights = await db.getUserRights(id);

    if (rights.contest.add) {
        const problemIds = flatten(await Promise.all(
            contest.sets.map(async setId => {
                const set =  await db.getSetById(setId);
                return set.problems
            })));
        const problems = await Promise.all(
            problemIds.map(async problemId => {
                return db.getProblemByIdForContest(problemId);
            }));
        const parsedContest = {
            ...contest,
            authorId: id,
            isActive: false,
            isFinished: false,
            problems
        };
        await db.addContest(parsedContest);
        return res.status(200).end();
    } else {
        return res.status(403).end();
    }
});

router.post('/:contestId', auth.required, async (req, res) => {
    const {body: {contest}, params: {contestId}, payload: {id}} = req;
    const rights = await db.getUserRights(id);

    const oldContest = await db.getGroupById(contestId);
    if (!oldContest) return res.status(404).end();

    if (rights.contest.edit || oldContest.authorId === id) { // TODO: || can write
        await db.updateContest(contestId, contest);
        return res.status(200).end();
    } else {
        return res.status(403).end();
    }
});

router.delete('/:contestId', auth.required, async (req, res) => {
    const {params: {contestId}, payload: {id}} = req;
    const rights = await db.getUserRights(id);

    const contest = await db.getGroupById(contestId);
    if (!contest) return res.status(404).end();

    if (rights.contest.delete || contest.authorId === id) {
        await db.deleteContest(contestId);
        return res.status(200).end();
    } else {
        return res.status(403).end();
    }
});

// router.post('/:contestId/:method', auth.required, (req, res) => {
//     const {params: {contestId, method}, payload: {id}} = req;
//     let contest;
//
//     getContestById(contestId).then((foundContest, error) => {
//         if (error) {
//             return res.status(500).end()
//         }
//         if (foundContest.authorId !== id) {
//             return res.status(403).end()
//         }
//         if (method === "start" && !foundContest.isActive && !foundContest.isFinished) {
//             contest.isActive = true;
//         }
//
//         if (method === "finish" && foundContest.isActive && !foundContest.isFinished) {
//             contest.isActive = false;
//             contest.isFinished = true;
//         }
//
//         if (contest) {
//             updateProblem(contestId, contest)
//                 .then(newContest => {
//                     return res.json({contest: newContest})
//                 })
//         }
//     });
// });

module.exports = router;