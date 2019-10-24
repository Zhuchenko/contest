import mongoose from 'mongoose'
import { UnverifiedUserSchema } from '../schemas'

export const UnverifiedUser = mongoose.model('UnverifiedUser', UnverifiedUserSchema, 'unverifiedUsers');

export const find = (query) => {
    return UnverifiedUser.find(query, null, {lean: true});
};

export const findOne = (query) => {
    return UnverifiedUser.findOne(query, null, {lean: true});
};

export const add = async (newInstance) => {
    UnverifiedUser.create(newInstance);
};

export const update = async (id, newState) => {
    UnverifiedUser.updateOne({_id: id}, {
        $set: {
            ...newState
        }
    });
};

export const remove = async (id) => {
    return UnverifiedUser.findByIdAndRemove(id);
};