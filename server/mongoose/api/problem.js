import mongoose from 'mongoose'
import { ProblemSchema } from '../schemas'

export const Problem = mongoose.model('Problem', ProblemSchema, 'problems')

export const getProblemById = (problemId) => {
    return Problem.findOne({ _id: problemId }).exec();
};

export const addProblem = (newProblem) => {
    return Problem.create(newProblem)
        .then(problem => {
            return problem._id.toString();
        });
};

export const updateProblem = async (problemId, problemNewState) => {
    await Problem.updateOne({_id: problemId}, {
        $set: {
            ...problemNewState
        }
    }).exec();
    return problemId;
};

export const deleteProblem = (problemId) => {
    return Problem.findByIdAndRemove(problemId).exec();
};