import mongoose from 'mongoose'
import { UserSchema } from '../schemas'

export const User = mongoose.model('User', UserSchema, 'users')

export const getUserById = async (userId) => {
    return User.findOne({ _id: userId }).exec();
};

export const getUserByUsername = (username) => {
    return User.findOne({ username: username }).exec();
};

export const getUserByEmail = (email) => {
    return User.findOne({ email: email }).exec();
};

export const addUser = async (newUser) => {

    return User.create(newUser)
        .then(user => {
            return user._id.toString();
        });
};

export const updateUser = async (userId, userNewState) => {
    await User.updateOne({_id: userId}, {
        $set: {
            ...userNewState
        }
    }).exec();
    return userId;
};

export const deleteUser = async (userId) => {
    return User.findByIdAndRemove(userId).exec();
};