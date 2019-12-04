import mongoose from 'mongoose'
import { ParcelSchema } from '../schemas'

export const Parcel = mongoose.model('Parcel', ParcelSchema, 'parcels')

export const find = async (query) => {
    return Parcel.find(query, null, {lean: true}).exec();
};

export const findOne = async (query) => {
    return Parcel.findOne(query, null, {lean: true});
};

export const add = async (newInstance) => {
    return Parcel.create(newInstance)
        .then(obj => (obj.id));
};

export const update = async (id, newState) => {
    await Parcel.updateOne({_id: id}, {
        $set: {
            ...newState
        }
    });
};

export const remove = async (id) => {
    Parcel.findByIdAndRemove(id).exec();
};