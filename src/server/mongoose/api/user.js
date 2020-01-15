import mongoose from 'mongoose'
import { UserSchema } from '../schemas'

export const User = mongoose.model('User', UserSchema, 'users');

export const find = (query, select) => {
    return User.find(query, null, {lean: true}).select(select);
};

export const findOne = (query, select) => {
    return User.findOne(query, null, {lean: true}).select(select);
};

export const add = async (newInstance) => {
    User.create(newInstance)
};

export const update = async (id, newState) => {
    User.updateOne({_id: id}, {
        $set: {
            ...newState
        }
    });
};

export const remove = async (id) => {
    return User.findByIdAndRemove(id).exec();
};

export const getUserById = async (id) => {
    return User.findOne({_id: id}).select('_id email name lastName role');
};