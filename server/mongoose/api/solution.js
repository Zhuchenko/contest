import mongoose from 'mongoose'
import { SolutionSchema } from '../schemas'

export const Solution = mongoose.model('Solution', SolutionSchema, 'solutions')

export const getSolutionById = (solutionId) => {
    return Solution.findOne({ _id: solutionId }).exec();
};

export const addSolution = (newSolution) => {
    return Solution.create(newSolution)
        .then(solution => {
            return solution._id.toString();
        });
};

export const updateSolution = async (solutionId, solutionNewState) => {
    await Solution.updateOne({_id: solutionId}, {
        $set: {
            ...solutionNewState
        }
    }).exec();
    return solutionId;
};

export const deleteSolution = (solutionId) => {
    return Solution.findByIdAndRemove(solutionId).exec();
};