import mongoose from 'mongoose'
import { TestResultSchema } from '../schemas'

export const TestResult = mongoose.model('TestResult', TestResultSchema, 'testResults')

export const getTestResultById = (testResultId) => {
    return TestResult.findOne({ _id: testResultId }).exec();
};

export const addTestResult = (newTestResult) => {
    return TestResult.create(newTestResult)
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

export const deleteTestResult = (testResultId) => {
    return TestResult.findByIdAndRemove(testResultId).exec();
};