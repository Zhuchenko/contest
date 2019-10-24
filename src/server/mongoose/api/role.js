import mongoose from 'mongoose'
import { RoleSchema } from '../schemas'

export const Role = mongoose.model('Role', RoleSchema, 'roles')

export const getRightsByName = async (name) => {
    return Role.findOne({ name }, null, {lean: true}).exec();
};