import mongoose from 'mongoose'
import { GroupOfUsersSchema } from '../schemas'
import {User} from "./user";

export const GroupOfUsers = mongoose.model('GroupOfUsers', GroupOfUsersSchema, 'groupsOfUsers')

export const getAllGroupsOfUsers = async () => {
    return GroupOfUsers.find();
};

export const getGroupsOfUsersByAuthorId = async (authorId) => {
    return GroupOfUsers.find({authorId});
};

export const getGroupOfUsersById = async (groupId) => {
    return GroupOfUsers.findOne({ _id: groupId }, null, {lean: true});
};

export const getGroupsOfUsersByParticipant = async (participantId) => {
    return GroupOfUsers.find({users:/* {$elemMatch:*/ participantId}/*}*/);
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