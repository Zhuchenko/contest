import mongoose from 'mongoose'
import { RoleSchema } from '../schemas'

export const Role = mongoose.model('Role', RoleSchema, 'roles')

export const getRightsByName = async (role) => {
    return Role.findOne({ name: role }, null, {lean: true}).exec();
};