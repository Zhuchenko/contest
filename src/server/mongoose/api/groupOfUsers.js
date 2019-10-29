import mongoose from 'mongoose'
import {GroupOfUsersSchema} from '../schemas'

export const GroupOfUsers = mongoose.model('GroupOfUsers', GroupOfUsersSchema, 'groupsOfUsers')

export const find = async (query) => {
    return GroupOfUsers.find(query, null, {lean: true}).exec();
};

export const findOne = async (query) => {
    return GroupOfUsers.findOne(query, null, {lean: true});
};

export const add = async (newInstance) => {
    GroupOfUsers.create(newInstance);
};

export const update = async (id, newState) => {
    await GroupOfUsers.updateOne({_id: id}, {
        $set: {
            ...newState
        }
    });
};

export const remove = async (id) => {
    GroupOfUsers.findByIdAndRemove(id).exec();
};