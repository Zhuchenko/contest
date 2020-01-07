import pickBy from 'lodash/pickBy'

import * as code from './api/code'
import * as contest from './api/contest'
import * as group from './api/groupOfUsers'
import * as parcel from './api/parcel'
import * as problem from './api/problem'
import * as role from './api/role'
import * as set from './api/setOfProblems'
import * as solution from './api/solution'
import * as testResult from './api/testResult'
import * as unverifiedUser from './api/unverifiedUser'
import * as user from './api/user'

const isNotUnderscoredId = (value, key) => key !== '_id';

const removeUnderscore = (item) => {
    if (!item) return null;
    return {id: item._id, ...pickBy(item, isNotUnderscoredId)};
};

const removeUnderscoreFromArray = (array) => {
    if (!array || array.length === 0) return [];
    return array.map(item => (removeUnderscore(item)));
};

// codes

export const getCode = async (code) => {
    return removeUnderscore(await code.findOne({code}));
};

export const addCode = async (newInstance) => {
    code.add(newInstance);
};

export const deleteCode = async (id) => {
    code.remove(id);
};

//contests

export const getContestById = async (id) => {
    return removeUnderscore(await contest.findOne({_id: id}));
};

export const getAllContests = async () => {
    return removeUnderscoreFromArray(await contest.find());
};

export const getAllContestsByQuery = async (query) => {
    return removeUnderscoreFromArray(await contest.find(query));
};

export const contestIsActive = async (id) => {//TODO: remove
    const contest = await contest.findOne({_id: id});
    if(!contest){
        return false;
    } else return contest.isActive;
};

export const hasReadRightForTheContest = async (userId, contestId) => {
    return !!(await contest.findOne({_id: contestId, sharedReadRights: userId}));
};

export const hasWriteRightForTheContest = async (userId, contestId) => {
    return !!(await contest.findOne({_id: contestId, sharedWriteRights: userId}));
};

export const getContestsByReadRight = async (id) => {
    return removeUnderscoreFromArray(await contest.find({sharedReadRights: id}));
};

export const getContestsByWriteRight = async (id) => {
    return removeUnderscoreFromArray(await contest.find({sharedWriteRights: id}));
};

export const getContestsByAuthor = async (id) => {
    return removeUnderscoreFromArray(await contest.find({authorId: id}));
};

export const getContestsByParticipant = async (participantId) => {
    const groups = await getGroupsByParticipant(participantId);
    let contests = [];
    for (let i = 0, l = groups.length; i < l; i++) {
        const contestsIncludesCurrentGroup = removeUnderscoreFromArray(await contest.find({groups: groups[i].id.toString()}));
        contests = [...contests, ...contestsIncludesCurrentGroup];
    }
    return contests;
};

export const isParticipantInTheContest = async (participantId, contestId) => {
    const groups = await getGroupsByParticipant(participantId);
    const contest = await getContestById(contestId);
    if (!contest) {
        return false;
    }
    for (let i = 0, l = groups.length; i < l; i++) {
        if (contest.groups.includes(groups[i].id.toString()))
            return true;
    }
    return false;
};

export const getProblemByIdInContest = async (contestId, problemId) => {
    const contest = await getContestById(contestId);
    if (!contest) {
        return null;
    }
    return contest.problems.find(({id}) => id.toString() === problemId);
};

export const addContest = async (newInstance) => {
    return await contest.add(newInstance);
};

export const updateContest = async (id, newState) => {
    contest.update(id, newState);
};

export const deleteContest = async (id) => {
    contest.remove(id);
};

// groups of users

export const getGroupById = async (id) => {
    return removeUnderscore(await group.findOne({_id: id}));
};

export const getAllGroups = async () => {
    return removeUnderscoreFromArray(await group.find());
};

export const getAllGroupsByQuery = async (query) => {
    return removeUnderscoreFromArray(await group.find(query));
};

export const getGroupsByAuthor = async (id) => {
    return removeUnderscoreFromArray(await group.find({authorId: id}));
};

export const hasReadRightForTheGroup = async (userId, groupId) => {
    return !!(await group.findOne({_id: groupId, sharedReadRights: userId}));
};

export const hasWriteRightForTheGroup = async (userId, groupId) => {
    return !!(await group.findOne({_id: groupId, sharedWriteRights: userId}));
};

export const getGroupsByReadRight = async (id) => {
    return removeUnderscoreFromArray(await group.find({sharedReadRights: id}));
};

export const getGroupsByWriteRight = async (id) => {
    return removeUnderscoreFromArray(await group.find({sharedWriteRights: id}));
};

export const getGroupsByParticipant = async (id) => {
    return removeUnderscoreFromArray(await group.find({users: id}));
};

export const addGroup = async (newInstance) => {
    group.add(newInstance);
};

export const updateGroup = async (id, newState) => {
    group.update(id, newState);
};

export const deleteGroup = async (id) => {
    group.remove(id);
};

// parcels

export const getParcelById = async (id) => {
    return removeUnderscore(await parcel.findOne({_id: id}));
};

export const getAllParcels = async () => {
    return removeUnderscoreFromArray(await parcel.find());
};

export const getParcelsByAuthor = async (id) => {
    return removeUnderscoreFromArray(await parcel.find({authorId: id}));
};

export const addParcel = async (newInstance) => {
    return await parcel.add(newInstance);
};

export const updateParcel = async (id, newState) => {
    parcel.update(id, newState);
};

export const deleteParcel = async (id) => {
    parcel.remove(id);
};

//problems

export const addProblem = async (newInstance) => {
    problem.add(newInstance);
};

export const getAllProblems = async () => {
    return removeUnderscoreFromArray(await problem.find());
};

export const getProblemsByReadRight = async (id) => {
    return removeUnderscoreFromArray(await problem.find({sharedReadRights: id}));
};

export const getProblemsByWriteRight = async (id) => {
    return removeUnderscoreFromArray(await problem.find({sharedWriteRights: id}));
};

export const hasReadRightForTheProblem = async (userId, problemId) => {
    return !!(await problem.findOne({_id: problemId, sharedReadRights: userId}));
};

export const hasWriteRightForTheProblem = async (userId, problemId) => {
    return !!(await problem.findOne({_id: problemId, sharedWriteRights: userId}));
};

export const getProblemById = async (id) => {
    return removeUnderscore(await problem.findOne({_id: id}));
};

export const getProblemsByAuthor = async (authorId) => {
    return removeUnderscoreFromArray(await problem.find({authorId}));
};

export const updateProblem = async (id, newState) => {
    problem.update(id, newState);
};

export const deleteProblem = async (id) => {
    problem.remove(id);
};

// roles

export const getRightsByName = async (name) => {
    const c = await role.findOne({name}, 'rights');
    if (c) {
        return c.rights;
    } else return null;
};

// sets of problems

export const getSetById = async (id) => {
    return removeUnderscore(await set.findOne({_id: id}));
};

export const getAllSets = async () => {
    return removeUnderscoreFromArray(await set.find());
};

export const getAllSetsByQuery = async (query) => {
    return removeUnderscoreFromArray(await set.find(query));
};

export const getSetsByReadRight = async (id) => {
    return removeUnderscoreFromArray(await set.find({sharedReadRights: id}));
};

export const getSetsByWriteRight = async (id) => {
    return removeUnderscoreFromArray(await set.find({sharedWriteRights: id}));
};

export const hasReadRightForTheSet = async (userId, setId) => {
    return !!(await set.findOne({_id: setId, sharedReadRights: userId}));
};

export const hasWriteRightForTheSet = async (userId, setId) => {
    return !!(await set.findOne({_id: setId, sharedWriteRights: userId}));
};

export const getSetsByAuthor = async (authorId) => {
    return removeUnderscoreFromArray(await set.find({authorId}));
};

export const addSet = async (newInstance) => {
    set.add(newInstance);
};

export const updateSet = async (id, newState) => {
    set.update(id, newState);
};

export const deleteSet = async (id) => {
    set.remove(id);
};

// solutions

export const getSolutionById = async (id) => {
    return removeUnderscore(await solution.findOne({_id: id}));
};

export const getSolutionByOptions = async ({authorId, contest, problem}) => {
    return removeUnderscore(await solution.findOne({authorId, problem, contest}));
};

export const getAllSolutions = async () => {
    return removeUnderscoreFromArray(await solution.find());
};

export const getSolutionsByAuthor = async (id) => {
    return removeUnderscoreFromArray(await solution.find({authorId: id}));
};

export const addSolution = async (newInstance) => {
    solution.add(newInstance);
};

export const updateSolution = async (id, newState) => {
    solution.update(id, newState);
};

export const deleteSolution = async (id) => {
    solution.remove(id);
};

// test results

export const getTestResultById = async (id) => {
    return removeUnderscore(await testResult.findOne({_id: id}));
};

export const getAllTestResults = async () => {
    return removeUnderscoreFromArray(await testResult.find());
};

export const getTestResultsByParcel = async (id) => {
    return removeUnderscoreFromArray(await testResult.find({parcel: id}));
};

export const addTestResult = async (newInstance) => {
    testResult.add(newInstance);
};

export const updateTestResult = async (id, newState) => {
    testResult.update(id, newState);
};

export const deleteTestResult = async (id) => {
    testResult.remove(id);
};

// unverified users

export const getUnverifiedUser = async (query) => {
    return removeUnderscore(await unverifiedUser.findOne(query, '_id email authKey name lastName role'));
};

export const getAllUnverifiedUsers = async () => {
    return removeUnderscoreFromArray(await unverifiedUser.find({}, '_id email authKey name lastName role'));
};

export const addUnverifiedUser = async (newInstance) => {
    unverifiedUser.add(newInstance);
};

export const updateUnverifiedUser = async (id, newState) => {
    unverifiedUser.update(id, newState);
};

export const deleteUnverifiedUser = async (id) => {
    unverifiedUser.remove(id);
};

// users

export const getUserById = async (id) => {
    return removeUnderscore(await user.findOne({_id: id}, '_id email name lastName role'));
};

export const getUserByEmail = async (email) => {
    return removeUnderscore(await user.findOne({email}, '_id email name lastName role'));
};

export const getUserRights = async (id) => {
    let c = await getUserById(id);
    if (!c) return null;
    return getRightsByName(c.role);
};

export const getAllUsers = async () => {
    return removeUnderscoreFromArray(await user.find({}, '_id email name lastName role'));
};

export const getAllParticipants = async () => {
    return removeUnderscoreFromArray(await user.find({role: "participant"}, '_id email name lastName role'));
};

export const getAllCoordinators = async () => {
    return removeUnderscoreFromArray(await user.find({role: "coordinator"}, '_id email name lastName role'));
};

export const isCoordinator = async (id) => {
    return !!(await user.findOne({_id: id, role: "coordinator"}));
};

export const addUser = async (newInstance) => {
    user.add(newInstance);
};

export const updateUser = async (id, newState) => {
    user.update(id, newState);
};

export const deleteUser = async (id) => {
    user.remove(id);
};