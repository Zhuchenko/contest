import mongoose from 'mongoose'
import { ProblemSchema } from '../schemas'

export const Problem = mongoose.model('Problem', ProblemSchema, 'problems')

export const getProblemById = (problemId) => {
    return Problem.findOne({ _id: problemId }).exec();
};

export const addProblem = (newProblem) => {
    newProblem.numberOfTests = newProblem.tests.length;

    for (let i = 0, l = newProblem.tests.length; i < l; i++){
        newProblem.tests[i].number = i+1;
    }

    return Problem.create(newProblem)
        .then(problem => {
            return problem;
        });
};

export const updateProblem = async (problemId, problemNewState) => {
    if(problemNewState.tests){
        problemNewState.numberOfTests = problemNewState.tests.length;

        for (let i = 0, l = problemNewState.tests.length; i < l; i++){
            problemNewState.tests[i].number = i+1;
        }
    }

    await Problem.updateOne({_id: problemId}, {
        $set: {
            ...problemNewState
        }
    }).exec();
    return getProblemById(problemId);
};

export const deleteProblem = (problemId) => {
    return Problem.findByIdAndRemove(problemId).exec();
};