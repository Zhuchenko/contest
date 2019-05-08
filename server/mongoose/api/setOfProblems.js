import mongoose from 'mongoose'
import { SetOfProblemsSchema } from '../schemas'

export const SetOfProblems = mongoose.model('SetOfProblems', SetOfProblemsSchema, 'setsOfProblems')

export const getSetOfProblemsById = (setId) => {
    return SetOfProblems.findOne({ _id: setId }).exec();
};

export const addSetOfProblems = (newSet) => {
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

export const deleteSetOfProblems = (setId) => {
    return SetOfProblems.findByIdAndRemove(setId).exec();
};
