import mongoose from 'mongoose'
import { ContestSchema } from '../schemas'

export const Contest = mongoose.model('Contest', ContestSchema, 'contests')

export const find = async (query) => {
    return Contest.find(query, null, {lean: true}).exec();
};

export const findOne = async (query) => {
    return Contest.findOne(query, null, {lean: true});
};

export const add = async (newInstance) => {
    return Contest.create(newInstance)
        .then(obj => (obj.id));
};

export const update = async (id, newState) => {
    await Contest.updateOne({_id: id}, {
        $set: {
            ...newState
        }
    });
};

export const remove = async (id) => {
    Contest.findByIdAndRemove(id).exec();
};