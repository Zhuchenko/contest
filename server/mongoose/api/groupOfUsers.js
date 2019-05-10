import mongoose from 'mongoose'
import { GroupOfUsersSchema } from '../schemas'

export const GroupOfUsers = mongoose.model('GroupOfUsers', GroupOfUsersSchema, 'groupsOfUsers')

export const getGroupOfUsersById = async (groupId) => {
    return GroupOfUsers.findOne({ _id: groupId }).exec();
};

export const addGroupOfUsers = async (newGroup) => {
    return GroupOfUsers.create(newGroup)
        .then(group => {
            return group;
        });
};

export const updateGroupOfUsers = async (groupId, groupNewState) => {
    await GroupOfUsers.updateOne({_id: groupId}, {
        $set: {
            ...groupNewState
        }
    }).exec();
    return getGroupOfUsersById(groupId);
};

export const deleteGroupOfUsers = async (groupId) => {
    return GroupOfUsers.findByIdAndRemove(groupId).exec();
};