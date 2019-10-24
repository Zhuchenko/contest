import mongoose from 'mongoose'
import { UnverifiedUserSchema } from '../schemas'

export const UnverifiedUser = mongoose.model('UnverifiedUser', UnverifiedUserSchema, 'unverifiedUsers');

export const getAllUnverifiedUsers = () => {
    return UnverifiedUser.find().select('_id email authKey name lastName role');
};

export const addUnverifiedUser = async (newUser) => {
    return await UnverifiedUser.create(newUser);
};

export const getUnverifiedUserById = (userId) => {
    return UnverifiedUser.findOne({ _id: userId }).select('_id email authKey name lastName role');
};

export const getUnverifiedUserByEmail = async (email) => {
    return UnverifiedUser.findOne({ email });
};

export const getUnverifiedUserByParams = async (params) => {
    return UnverifiedUser.findOne(params).exec();
};

export const updateUnverifiedUser = async (userId, userNewState) => {
    await UnverifiedUser.updateOne({_id: userId}, {
        $set: {
            ...userNewState
        }
    }).exec();
    return userId;
};

export const deleteUnverifiedUser = async (userId) => {
    return UnverifiedUser.findByIdAndRemove(userId).exec();
};