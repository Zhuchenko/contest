import mongoose from 'mongoose'
import { UnverifiedUserSchema } from '../schemas'
import {User} from "./user";

export const UnverifiedUser = mongoose.model('UnverifiedUser', UnverifiedUserSchema, 'unverifiedUsers');

export const find = (query, select) => {
    return UnverifiedUser.find(query, null, {lean: true}).select(select);
};

export const findOne = (query, select) => {
    return UnverifiedUser.findOne(query, null, {lean: true}).select(select);
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

export const getUnverifiedUser = async (query) => {
    return UnverifiedUser.findOne(query, '_id email authKey name lastName role')
};