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

const removeUnderscore  = (item) => {
    return {id: item._id, ...pickBy(item, isNotUnderscoredId)};
};

const removeUnderscoreFromArray  = (array) => {
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



// groups of users

export const getGroupById = async (id) => {
    return removeUnderscore(await group.findOne({_id: id}));
};

export const getAllGroups = async () => {
    return removeUnderscoreFromArray(await group.find());
};

export const getGroupsByAuthor = async (id) => {
    return removeUnderscoreFromArray(await group.find({authorId: id}));
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

//problems

export const addProblem = async (newInstance) => {
    problem.add(newInstance);
};

export const getAllProblems = async () => {
    return removeUnderscoreFromArray(await problem.find());
};

export const getProblemById = async (id) => {
    return removeUnderscore(await problem.findOne({_id: id}));
};

export const getProblemsByAuthor = async (authorId) => {
    return removeUnderscore(await problem.find({authorId}));
};

export const updateProblem = async (id, newState) => {
    problem.update(id, newState);
};

export const deleteProblem = async (id) => {
    problem.remove(id);
};

// roles

export const getRightsByName = async (name) => {
    return (await role.findOne({name}, 'rights')).rights;
};

// unverified users

export const getUnverifiedUser = async (query) => {
    return removeUnderscore(await unverifiedUser.findOne(query, '_id email authKey name lastName role'));
};

export const getUnverifiedUserById = async (id) => {
    return removeUnderscore(await unverifiedUser.findOne({_id: id}, '_id email authKey name lastName role'));
};

export const getUnverifiedUserByEmail = async (email) => {
    return removeUnderscore(await unverifiedUser.findOne({email}, '_id email authKey name lastName role'));
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
    const userRole =  (await getUserById(id)).role;
    return getRightsByName(userRole);
};

export const getAllUsers = async () => {
    return removeUnderscoreFromArray(await user.find({}, '_id email name lastName role'));
};

export const getAllParticipants = async () => {
    return removeUnderscoreFromArray(await user.find({role: "participant"}, '_id email name lastName role'));
};

export const updateUser = async (id, newState) => {
    user.update(id, newState);
};

export const deleteUser = async (id) => {
    user.remove(id);
};