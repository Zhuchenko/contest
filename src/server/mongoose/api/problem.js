import mongoose from 'mongoose'
import { ProblemSchema } from '../schemas'

export const Problem = mongoose.model('Problem', ProblemSchema, 'problems')

export const find = (query, select) => {
    return Problem.find(query, null, {lean: true}).select(select);
};

export const findOne = (query, select) => {
    return Problem.findOne(query, null, {lean: true}).select(select);
};

export const add = async (newInstance) => {
    for (let i = 0, l = newInstance.tests.length; i < l; i++){
        newInstance.tests[i].number = i+1;
    }

    return Problem.create(newInstance)
};

export const update = async (id, newState) => {
    if(newState.tests){
        for (let i = 0, l = newState.tests.length; i < l; i++){
            newState.tests[i].number = i+1;
        }
    }

    await Problem.updateOne({_id: id}, {
        $set: {
            ...newState
        }
    });
};

export const remove = async (id) => {
    return Problem.findByIdAndRemove(id).exec();
};
