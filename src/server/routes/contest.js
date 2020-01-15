import express from 'express'
import schedule from 'node-schedule'
import flatten from 'lodash/flatten'
import auth from '../config/auth'
import * as db from '../mongoose/DatabaseHandler'

const router = express.Router();

router.get('/', auth.required, async (req, res) => {
    const {payload: {id}} = req;

    let rights;
    try {
        rights = await db.getUserRights(id);
    } catch (error) {
        return res.status(400).json({error});
    }
    try {
        let contests = [];
        if (rights.contest.view) {
            contests = await Promise.all((await db.getAllContests()).map(async contest => {
                    const sharedReadRights = await Promise.all(contest.sharedReadRights.map(async userId => (await db.getUserById(userId))));
                    const sharedWriteRights = await Promise.all(contest.sharedWriteRights.map(async userId => (await db.getUserById(userId))));
                    return {
                        ...contest,
                        sharedReadRights,
                        sharedWriteRights,
                        canEdit: true,
                        canDelete: true
                    }
                }
            ));
        } else {
            if (rights.contest.add) {
                const ownContests = await Promise.all((await db.getContestsByAuthor(id)).map(async contest => {
                        const sharedReadRights = await Promise.all(contest.sharedReadRights.map(async userId => (await db.getUserById(userId))));
                        const sharedWriteRights = await Promise.all(contest.sharedWriteRights.map(async userId => (await db.getUserById(userId))));
                        return {
                            ...contest,
                            sharedReadRights,
                            sharedWriteRights,
                            canEdit: true,
                            canDelete: true
                        }
                    }
                ));

                const sharedContestsForReading = (await db.getContestsByReadRight(id)).map(contest => ({
                    ...contest,
                    canEdit: false,
                    canDelete: false
                }));

                const sharedContestsForWriting = (await db.getContestsByWriteRight(id)).map(contest => ({
                    ...contest,
                    canEdit: true,
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
    } catch (error) {
        return res.status(500).json({error});
    }
});

router.get('/creating/groups/:contestId', auth.required, async (req, res) => {
    const {params: {contestId}, payload: {id}} = req;
    let rights;
    try {
        rights = await db.getUserRights(id);
    } catch (error) {
        return res.status(400).json({error});
    }

    try {
        let groups = [];
        if (rights.contest.add) {
            if (rights.groupOfUsers.view) {
                groups = (await db.getAllGroups()).map(({id, name}) => ({id, name}));
            } else {
                if (rights.groupOfUsers.add) {
                    groups = (await db.getGroupsByAuthor(id)).map(({id, name}) => ({id, name}));
                    let groupsInContest = [];

                    if(!!contestId) {
                        const contest = await db.getContestById(contestId);
                        groupsInContest = await Promise.all(
                            contest.groups.map(async groupId => {
                                const {id, name} = await db.getGroupById(groupId);
                                return {id, name};
                            })
                        );
                    }

                    groups = groups.concat(groupsInContest)
                } else {
                    return res.status(403).end();
                }
            }
        } else {
            return res.status(403).end();
        }
        return res.status(200).json({groups});
    } catch (error) {
        return res.status(500).json({error});
    }
});

router.get('/creating/sets/:contestId', auth.required, async (req, res) => {
    const {params: {contestId}, payload: {id}} = req;
    let rights;
    try {
        rights = await db.getUserRights(id);
    } catch (error) {
        return res.status(400).json({error});
    }

    try {
        let sets = [];
        if (rights.contest.add) {
            if (rights.setOfProblems.view) {
                sets = (await db.getAllSets()).map(({id, name}) => ({id, name}));
            } else {
                if (rights.setOfProblems.add) {
                    sets = (await db.getSetsByAuthor(id)).map(({id, name}) => ({id, name}));
                    let setsInContest = [];

                    if(!!contestId) {
                        const contest = await db.getContestById(contestId);
                        setsInContest = await Promise.all(
                            contest.sets.map(async setId => {
                                const {id, name} = await db.getSetById(setId);
                                return {id, name};
                            })
                        );
                    }

                    sets = sets.concat(setsInContest)
                } else {
                    return res.status(403).end();
                }
            }
        } else {
            return res.status(403).end();
        }

        return res.json({sets});
    } catch (error) {
        return res.status(500).json({error});
    }
});

router.get('/:contestId', auth.required, async (req, res) => {
    const {params: {contestId}, payload: {id}} = req;

    let contest;
    try {
        contest = await db.getContestById(contestId);
    } catch (error) {
        return res.status(500).json({error});
    }
    if (!contest) return res.status(404).end();

    let rights;
    try {
        rights = await db.getUserRights(id);
    } catch (error) {
        return res.status(400).json({error});
    }


    try {
        const isParticipant = await db.isParticipantInTheContest(id, contestId);
        const hasReadRight = await db.hasReadRightForTheContest(id, contestId);
        const hasWriteRight = await db.hasWriteRightForTheContest(id, contestId);

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

            const sets = await Promise.all(
                contest.sets.map(async setId => {
                    const {id, name, problems} = await db.getSetById(setId);
                    const problemsFullInfo = await Promise.all(problems.map(async problemId => {
                        return await db.getProblemById(problemId);
                    }));
                    return {id, name, problems: problemsFullInfo};
                })
            );

            return res.status(200).json({name: contest.name, status, groups, isParticipant, sets})
        } else {
            return res.status(403).end();
        }
    } catch (error) {
        return res.status(500).json({error});
    }
});

router.get('/table-view/:contestId', auth.required, async (req, res) => {
    const {params: {contestId}, payload: {id}} = req;

    let contest;
    try {
        contest = await db.getContestById(contestId);
    } catch (error) {
        return res.status(500).json({error});
    }
    if (!contest) return res.status(404).end();

    let rights;
    try {
        rights = await db.getUserRights(id);
    } catch (error) {
        return res.status(400).json({error});
    }

    try {
        const isParticipant = await db.isParticipantInTheContest(id, contestId);
        const hasReadRight = await db.hasReadRightForTheContest(id, contestId);
        const hasWriteRight = await db.hasWriteRightForTheContest(id, contestId);

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

            const users = flatten(await Promise.all(
                contest.groups.map(async groupId => {
                    const group = await db.getGroupById(groupId);
                    return await Promise.all(group.users.map(async userId => {
                        return await db.getUserById(userId);
                    }));
                })
            ));

            const problems = flatten(await Promise.all(
                contest.sets.map(async setId => {
                    const set = await db.getSetById(setId);
                    return await Promise.all(set.problems.map(async problemId => {
                        return await db.getProblemById(problemId);
                    }));
                })
            ));

            let table = {};

            for (let userIndex = 0; userIndex < users.length; userIndex++){
                table[users[userIndex].id] = {};
                for (let problemIndex = 0; problemIndex < problems.length; problemIndex++){
                    let result;
                    try {
                        const query = {contestId, problemId: problems[problemIndex].id, authorId: users[userIndex].id};
                        const parcel = await db.getParcel(query);
                        const {tests} = await db.getTestResultsByParcel(parcel.id);
                        result = tests[tests.length - 1];
                    }
                    catch(e){
                        result = {shortening: '-', message: 'Еще не было решений'};
                    }
                    table[users[userIndex].id][problems[problemIndex].id] = result;
                }
            }

            return res.status(200).json({status, table, users, problems})
        } else {
            return res.status(403).end();
        }
    } catch (error) {
        return res.status(500).json({error});
    }
});

router.get('/:contestId/problems/:problemId', auth.required, async (req, res) => {
    const {params: {contestId, problemId}, payload: {id}} = req;

    let contest;
    try {
        contest = await db.getContestById(contestId);
    } catch (error) {
        return res.status(500).end();
    }
    if (!contest) return res.status(404).end();

    let rights;
    try {
        rights = await db.getUserRights(id);
    } catch (error) {
        return res.status(400).json({error});
    }

    try {
        const isParticipant = await db.isParticipantInTheContest(id, contestId);
        const hasReadRight = await db.hasReadRightForTheContest(id, contestId);
        const hasWriteRight = await db.hasWriteRightForTheContest(id, contestId);

        const canView = rights.contest.view || id === contest.authorId || (isParticipant && contest.isActive) || hasReadRight || hasWriteRight;
        if (canView) {
            const problem = await db.getProblemById(problemId);

            return res.status(200).json({problem, isParticipant});
        } else {
            return res.status(403).end();
        }
    } catch (error) {
        return res.status(500).json({error});
    }
});

router.post('/', auth.required, async (req, res) => {
    const {body: {contest}, payload: {id}} = req;

    let rights;
    try {
        rights = await db.getUserRights(id);
    } catch (error) {
        return res.status(400).json({error});
    }

    try {
        if (rights.contest.add) {
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
                sharedWriteRights: []
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
    } catch (error) {
        return res.status(500).json({error});
    }
});

router.post('/:contestId', auth.required, async (req, res) => {
    const {body: {contest}, params: {contestId}, payload: {id}} = req;

    let rights;
    try {
        rights = await db.getUserRights(id);
    } catch (error) {
        return res.status(400).json({error});
    }

    let oldContest;
    try {
        oldContest = await db.getContestById(contestId);
    } catch (error) {
        return res.status(500).json({error});
    }
    if (!oldContest) return res.status(404).end();

    try {
        const hasWriteRight = await db.hasWriteRightForTheContest(id, contestId);
        if (rights.contest.edit || oldContest.authorId === id || hasWriteRight) {
            await db.updateContest(contestId, contest);
            return res.status(200).end();
        } else {
            return res.status(403).end();
        }
    } catch (error) {
        return res.status(500).json({error});
    }
});

router.delete('/:contestId', auth.required, async (req, res) => {
    const {params: {contestId}, payload: {id}} = req;

    let rights;
    try {
        rights = await db.getUserRights(id);
    } catch (error) {
        return res.status(400).json({error});
    }

    let contest;
    try {
        contest = await db.getContestById(contestId);
    } catch (error) {
        return res.status(500).json({error});
    }
    if (!contest) return res.status(404).end();

    try {
        if (rights.contest.delete || contest.authorId === id) {
            await db.deleteContest(contestId);
            return res.status(200).end();
        } else {
            return res.status(403).end();
        }
    } catch (error) {
        return res.status(500).json({error});
    }
});

module.exports = router;