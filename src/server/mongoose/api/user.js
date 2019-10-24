import mongoose from 'mongoose'
import { UserSchema } from '../schemas'

export const User = mongoose.model('User', UserSchema, 'users')

export const find = (query) => {
    return User.find(query, null, {lean: true});
};

export const findOne = (query) => {
    return User.findOne(query, null, {lean: true});
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