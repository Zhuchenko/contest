import mongoose from 'mongoose'
import { SetOfProblemsSchema } from '../schemas'

export const SetOfProblems = mongoose.model('SetOfProblems', SetOfProblemsSchema, 'setsOfProblems')

export const getSetOfProblemsById = async (setId) => {
    return SetOfProblems.findOne({ _id: setId }).exec();
};

export const addSetOfProblems = async (newSet) => {
    return SetOfProblems.create(newSet)
        .then(set => {
            return set;
        });
};

export const updateSetOfProblems = async (setId, setNewState) => {
    await SetOfProblems.updateOne({_id: setId}, {
        $set: {
            ...setNewState
        }
    }).exec();
    return getSetOfProblemsById(setId);
};

export const deleteSetOfProblems = async (setId) => {
    return SetOfProblems.findByIdAndRemove(setId).exec();
};
