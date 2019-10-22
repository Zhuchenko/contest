import mongoose from 'mongoose'
import { UserSchema } from '../schemas'

export const User = mongoose.model('User', UserSchema, 'users')

export const getAllUsers = () => {
    return User.find().select('_id email name lastName role');
};

export const getAllParticipants = () => {
    return User.find({role: 'participant'}).select('_id name lastName');
};

export const addUser = async (newUser) => {
    return User.create(newUser)
        .then(user => {
            return user._id.toString();
        });
};

export const getUserById = (userId) => {
    return User.findOne({ _id: userId }).select('_id email name lastName role');
};

export const getUserByEmail = (email) => {
    return User.findOne({ email: email }).exec();
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