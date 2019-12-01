import express from 'express'
import schedule from 'node-schedule'
import flatten from 'lodash/flatten'
import auth from '../config/auth'
import * as db from '../mongoose/DatabaseHandler'

const router = express.Router();

router.get('/', auth.required, async (req, res) => {
    const {payload: {id}} = req;
    const rights = await db.getUserRights(id);
    let contests = [];
    if (rights.contest.view) {
        contests = (await db.getAllContests()).map(contest => ({...contest, canEdit: true, canDelete: true}));
    } else {
        if (rights.contest.add) {
            const ownContests = (await db.getContestsByAuthor(id)).map(contest => ({
                ...contest,
                canEdit: true,
                canDelete: true
            }));

            const sharedContestsForReading = (await db.getContestsByReadRight(id)).map(contest => ({
                ...contest,
                canEdit: true,
                canDelete: false
            }));

            const sharedContestsForWriting = (await db.getContestsByWriteRight(id)).map(contest => ({
                ...contest,
                canEdit: false,
                canDelete: false
            }));
            contests = [...ownContests, ...sharedContestsForReading, ...sharedContestsForWriting];
        } else {
            contests = (await db.getContestsByParticipant(id)).map(contest => ({
                ...contest,
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

router.get('/:contestId', auth.required, async (req, res) => {
    const {params: {contestId}, payload: {id}} = req;

    const contest = await db.getContestById(contestId);
    if (!contest) return res.status(404).end();   // TODO: check for converting to ObjectId

    const rights = await db.getUserRights(id);
    const isParticipant = await db.isParticipantInTheContest(id, contestId);
    const hasReadRight = await db.hasReadRightForTheContest(id, contestId);
    const hasWriteRight = await db.hasReadRightForTheContest(id, contestId);

    const canView = rights.contest.view || id === contest.authorId || isParticipant || hasReadRight || hasWriteRight;
    if (canView) {
        let status = '';
        if (!contest.isFinished) {
            if (!contest.isActive) {
                status = 'is not started';
            } else {
                status = 'is active';
            }
        } else {
            status = 'is finished';
        }

        const groups = await Promise.all(
            contest.groups.map(async groupId => {
                const {id, name, users} = await db.getGroupById(groupId);
                const usersFullInfo = await Promise.all(users.map(async usersId => {
                    return await db.getUserById(usersId);
                }));
                return {id, name, users: usersFullInfo};
            })
        );

        //TODO: add rights to problem list

        return res.json({status, participants: groups, isParticipant, problems: contest.problems})
    } else {
        return res.status(403).end();
    }
});

router.get('/:contestId/problems/:problemId', auth.required, async (req, res) => {
    const {params: {contestId, problemId}, payload: {id}} = req;

    const contest = await db.getContestById(contestId);
    if (!contest) return res.status(404).end();   // TODO: check for converting to ObjectId

    const rights = await db.getUserRights(id);
    const isParticipant = await db.isParticipantInTheContest(id, contestId);
    const hasReadRight = await db.hasReadRightForTheContest(id, contestId);
    const hasWriteRight = await db.hasReadRightForTheContest(id, contestId);

    const canView = rights.contest.view || id === contest.authorId || isParticipant || hasReadRight || hasWriteRight;
    if (canView) {
        const problem = await db.getProblemByIdInContest(contestId, problemId);

        return res.json({problem, isParticipant})
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
                const set = await db.getSetById(setId);
                return set.problems
            })));
        const problems = await Promise.all(
            problemIds.map(async problemId => {
                return db.getProblemByIdForContest(problemId);
            }));

        const start = new Date(contest.startingDate);
        const startingDate = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0, 0);

        const end = new Date(contest.endingDate);
        const endingDate = new Date(end.getFullYear(), end.getMonth(), end.getDate() + 1, 0, 0, 0, 0);

        const parsedContest = {
            ...contest,
            startingDate,
            endingDate,
            authorId: id,
            isActive: false,
            isFinished: false,
            sharedReadRights: [],
            sharedWriteRights: [],
            problems
        };
        const contestId = await db.addContest(parsedContest);

        schedule.scheduleJob(contestId + 'start', startingDate, function () {
            db.updateContest(contestId, {isActive: true});
        });

        schedule.scheduleJob(contestId + 'end', endingDate, function () {
            db.updateContest(contestId, {isActive: false, isFinished: true});
        });
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
    const hasWriteRight = await db.hasReadRightForTheContest(id, contestId);

    if (rights.contest.edit || oldContest.authorId === id || hasWriteRight) {
        await db.updateContest(contestId, contest);
        return res.status(200).end();
    } else {
        return res.status(403).end();
    }
});

router.delete('/:contestId', auth.required, async (req, res) => {
    const {params: {contestId}, payload: {id}} = req;
    const rights = await db.getUserRights(id);

    const contest = await db.getContestById(contestId);
    if (!contest) return res.status(404).end();

    if (rights.contest.delete || contest.authorId === id) {
        await db.deleteContest(contestId);
        return res.status(200).end();
    } else {
        return res.status(403).end();
    }
});

module.exports = router;