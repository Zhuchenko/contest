import mongoose from 'mongoose'
import { CodeSchema } from '../schemas'

export const Code = mongoose.model('Code', CodeSchema, 'codes')

export const findOne = async (query) => {
    return Code.findOne(query);
};

export const add = async (newInstance) => {
    Code.create(newInstance)
};

export const remove = async (id) => {
    Code.findByIdAndRemove(id);
};