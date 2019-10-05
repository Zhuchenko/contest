import mongoose from 'mongoose'
import { ExpectedUserSchema } from '../schemas'

export const ExpectedUser = mongoose.model('ExpectedUser', ExpectedUserSchema, 'expectedUsers')

export const getAll = () => {
    return ExpectedUser.find();
};

export const getExpectedUserById = (userId) => {
    return ExpectedUser.findOne({ _id: userId }).exec();
};

export const getExpectedUserByEmail = (email) => {
    return ExpectedUser.findOne({ email }).exec();
};

// export const getExpectedUserByAuthKey = async (authKey, name, lastName) => {
//     return ExpectedUser.findOne({ authKey, name, lastName }).exec();
// };

export const getExpectedUserByParams = async (params) => {
    return ExpectedUser.findOne(params).exec();
};

export const addExpectedUser = async (newUser) => {
    return await ExpectedUser.create(newUser);
};

export const updateExpectedUser = async (userId, userNewState) => {
    await ExpectedUser.updateOne({_id: userId}, {
        $set: {
            ...userNewState
        }
    }).exec();
    return userId;
};

export const deleteExpectedUser = async (userId) => {
    return ExpectedUser.findByIdAndRemove(userId).exec();
};