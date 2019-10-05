import mongoose from 'mongoose'
import { CodeSchema } from '../schemas'

export const Code = mongoose.model('Code', CodeSchema, 'codes')

export const getCode = async (code) => {
    return Code.findOne({ code }).exec();
};

export const addCode= async (newCode) => {  //mast be unique, may be use hash of email
    return Code.create(newCode)
        .then(code => {
            return code;
        });
};

// export const updateContest = async (contestId, contestNewState) => {
//     await Contest.updateOne({_id: contestId}, {
//         $set: {
//             ...contestNewState
//         }
//     }).exec();
//     return getContestById(contestId);
// };
//
// export const deleteContest = async (contestId) => {
//     return Contest.findByIdAndRemove(contestId).exec();
// };