import mongoose from 'mongoose'
import { RoleSchema } from '../schemas'

export const Role = mongoose.model('Role', RoleSchema, 'roles')

export const findOne = async (query, select) => {
    return Role.findOne(query, null, {lean: true}).select(select);
};