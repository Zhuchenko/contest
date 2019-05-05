import mongoose from 'mongoose'
import { ContestSchema } from '../schemas'

export const Contest = mongoose.model('Contest', ContestSchema, 'contests')

export const getContestById = (contestId) => {
    return Contest.findOne({ _id: contestId }).exec();
};

export const getAllContests = () => {
    return Contest.find({});
};

export const addContest = (newContest) => {
    return Contest.create(newContest)
        .then(contest => {
            return contest._id.toString();
        });
};

export const updateContest = async (contestId, contestNewState) => {
    await Contest.updateOne({_id: contestId}, {
        $set: {
            ...contestNewState
        }
    }).exec();
    return contestId;
};

export const deleteContest = (contestId) => {
    return Contest.findByIdAndRemove(contestId).exec();
};