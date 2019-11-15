import mongoose from 'mongoose'
import { SetOfProblemsSchema } from '../schemas'

export const SetOfProblems = mongoose.model('SetOfProblems', SetOfProblemsSchema, 'setsOfProblems')

export const find = (query, select) => {
    return SetOfProblems.find(query, null, {lean: true}).select(select);
};

export const findOne = (query, select) => {
    return SetOfProblems.findOne(query, null, {lean: true}).select(select);
};

export const add = async (newInstance) => {
    SetOfProblems.create(newInstance)
};

export const update = async (id, newState) => {
    await SetOfProblems.updateOne({_id: id}, {
        $set: {
            ...newState
        }
    });
};

export const remove = async (id) => {
    return SetOfProblems.findByIdAndRemove(id).exec();
};