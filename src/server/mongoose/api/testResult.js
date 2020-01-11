import mongoose from 'mongoose'
import { TestResultSchema } from '../schemas'

export const TestResult = mongoose.model('TestResult', TestResultSchema, 'testResults')

export const find = async (query) => {
    return TestResult.find(query, null, {lean: true}).exec();
};

export const findOne = async (query) => {
    return TestResult.findOne(query, null, {lean: true});
};

export const add = async (newInstance) => {
    await TestResult.create(newInstance);
};


export const update = async (id, newState) => {
    await TestResult.updateOne({_id: id}, {
        $set: {
            ...newState
        }
    });
};

export const remove = async (id) => {
    TestResult.findByIdAndRemove(id).exec();
};