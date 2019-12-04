import mongoose from 'mongoose'
import { SolutionSchema } from '../schemas'

export const Solution = mongoose.model('Solution', SolutionSchema, 'solutions')

export const find = async (query) => {
    return Solution.find(query, null, {lean: true}).exec();
};

export const findOne = async (query) => {
    return Solution.findOne(query, null, {lean: true});
};

export const add = async (newInstance) => {
    Solution.create(newInstance);
};

export const update = async (id, newState) => {
    await Solution.updateOne({_id: id}, {
        $set: {
            ...newState
        }
    });
};

export const remove = async (id) => {
    Solution.findByIdAndRemove(id).exec();
};