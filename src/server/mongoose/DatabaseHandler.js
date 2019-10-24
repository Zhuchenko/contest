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

// codes

export const getCode = async (code) => {
    return code.findOne({code});
};

export const addCode = async (newInstance) => {
    code.add(newInstance);
};

export const deleteCode = async (id) => {
    code.remove(id);
};

// groups of users

export const getGroupById = async (id) => {
    return group.findOne({_id: id});
};

export const getAllGroups = async () => {
    return group.find();
};

export const getGroupsByAuthor = async (id) => {
    return group.find({authorId: id});
};

export const getGroupsByParticipant = async (id) => {
    return group.find({users: id});
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

// role

export const getRoleByName = async (name) => {
    return role.findOne({name}).select('rights');
};

// unverified users

export const getUnverifiedUser = async (query) => {
    return unverifiedUser.findOne(query).select('_id email authKey name lastName role');
};

export const getUnverifiedUserById = async (id) => {
    return unverifiedUser.findOne({_id: id}).select('_id email authKey name lastName role');
};

export const getUnverifiedUserByEmail = async (email) => {
    return unverifiedUser.findOne({email}).select('_id email authKey name lastName role');
};

export const getAllUnverifiedUsers = async () => {
    return unverifiedUser.find().select('_id email authKey name lastName role');
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
    return user.findOne({_id: id}).select('_id email name lastName role');
};

export const getUserByEmail = async (email) => {
    return user.findOne({email}).select('_id email name lastName role');
};

export const getUserRights = async (id) => {
    const userRole =  (await getUserById(id).select('role')).role;
    return (await getRoleByName(userRole)).rights;
};

export const getAllUsers = async () => {
    return user.find().select('_id email name lastName role');
};

export const getAllParticipants = async () => {
    return user.find({role: "participant"}).select('_id email name lastName role');
};

export const updateUser = async (id, newState) => {
    user.update(id, newState);
};

export const deleteUser = async (id) => {
    user.remove(id);
};