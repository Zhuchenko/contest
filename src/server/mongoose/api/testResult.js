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
    let {tests, parcelId} = newInstance;

    tests = tests.map(res => {
        return {
            number: res.number,
            result: {
                shortening: res.shortening,
                message: res.message
            }
        }
    });

    await TestResult.create({parcelId, tests});
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