import mongoose from 'mongoose'
import { ContestSchema } from '../schemas'

export const Contest = mongoose.model('Contest', ContestSchema, 'contests')

export const getContestById = async (contestId) => {
    return Contest.findOne({ _id: contestId }).exec();
};

export const getAllContests = async () => {
    return Contest.find({});
};

export const addContest = async (newContest) => {
    return Contest.create(newContest)
        .then(contest => {
            return contest;
        });
};

export const updateContest = async (contestId, contestNewState) => {
    await Contest.updateOne({_id: contestId}, {
        $set: {
            ...contestNewState
        }
    }).exec();
    return getContestById(contestId);
};

export const deleteContest = async (contestId) => {
    return Contest.findByIdAndRemove(contestId).exec();
};