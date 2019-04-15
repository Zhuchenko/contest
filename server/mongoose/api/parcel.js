import mongoose from 'mongoose'
import { ParcelSchema } from '../schemas'

export const Parcel = mongoose.model('Parcel', ParcelSchema, 'parcels')

export const getParcelById = (parcelId) => {
    return Parcel.findOne({ _id: parcelId }).exec();
};

export const addParcel = (newParcel) => {
    return Parcel.create(newParcel)
        .then(parcel => {
            return parcel._id.toString();
        });
};

export const updateParcel = async (parcelId, parcelNewState) => {
    await Parcel.updateOne({_id: parcelId}, {
        $set: {
            ...parcelNewState
        }
    }).exec();
    return parcelId;
};

export const deleteParcel = (parcelId) => {
    return Parcel.findByIdAndRemove(parcelId).exec();
};