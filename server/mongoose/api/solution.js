import mongoose from 'mongoose'
import { SolutionSchema } from '../schemas'

export const Solution = mongoose.model('Solution', SolutionSchema, 'solutions')

export const getSolutionById = (solutionId) => {
    return Solution.findOne({ _id: solutionId }).exec();
};

export const getSolutionByOptions = async (options) => {
    return Solution.findOne({ user: options.user, problem: options.problem, contest: options.contest }).exec();
};

export const addSolution = async (newSolution) => {
    return Solution.create(newSolution)
        .then(solution => {
            return solution._id.toString();
        });
};

export const updateSolution = async (solutionId, solutionNewState) => {
    Solution.updateOne({_id: solutionId}, {
        $set: {
            ...solutionNewState
        }
    }).exec();
};

export const deleteSolution = async (solutionId) => {
    return Solution.findByIdAndRemove(solutionId).exec();
};