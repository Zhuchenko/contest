import mongoose from 'mongoose'
import { TestResultSchema } from '../schemas'

export const TestResult = mongoose.model('TestResult', TestResultSchema, 'testResults')

export const getTestResultById = async (testResultId) => {
    return TestResult.findOne({ _id: testResultId }).exec();
};

export const addTestResult = async (newTestResult) => {
    let {tests, parcel} = newTestResult;

    tests = tests.map(res => {
        return {
            number: res.number,
            result: {
                shortening: res.shortening,
                message: res.message
            }
        }
    });

    return TestResult.create({parcel, tests})
        .then(testResult => {
            return testResult._id.toString();
        });
};

export const updateTestResult = async (testResultId, testResultNewState) => {
    await TestResult.updateOne({_id: testResultId}, {
        $set: {
            ...testResultNewState
        }
    }).exec();
    return testResultId;
};

export const deleteTestResult = async (testResultId) => {
    return TestResult.findByIdAndRemove(testResultId).exec();
};