import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: String,
    lastName: String,
    password: String
});

export const GroupOfUsersSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    users: [ObjectId]
});

export const Problem = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    authorId: {
        type: ObjectId,
        required: true
    },
    limitation: {
        time:{
            type: Number,
            required: true
        },
        memory:{
            type: Number,
            required: true
        }
    },
    tests:[{
        input: {
            type: String,
            required: true
        },
        output: {
            type: String,
            required: true
        },
        number: {
            type: Number,
            required: true
        },
        description: String
    }],
    numberOfTests:{
        type: Number,
        required: true
    },
    options:[{
        programmingLanguage:{
            type: String,
            required: true
        },
        compiler: {
            type: String,
            required: true
        }
    }]
});

export const SetOfProblemsSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    authorId: {
        type: ObjectId,
        required: true
    },
    problems: [ObjectId]
});

export const СontestSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    setOfProblems: {
        type: ObjectId,
        required: true
    },
    groupOfUsers: {
        type: ObjectId,
        required: true
    },
    authorId: {
        type: ObjectId,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    startingDate:{
        type: Date,
        required: true
    },
    endingDate:{
        type: Date,
        required: true
    },
});

export const ParcelSchema = new Schema({
    user: {
        type: ObjectId,
        required: true
    },
    problem: {
        type: ObjectId,
        required: true
    },
    contest: {
        type: ObjectId,
        required: true
    },
    options:{
        programmingLanguage:{
            type: String,
            required: true
        },
        compiler: {
            type: String,
            required: true
        }
    },
    code: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
});

export const SolutionSchema = new Schema({
    user: {
        type: ObjectId,
        required: true
    },
    problem: {
        type: ObjectId,
        required: true
    },
    contest: {
        type: ObjectId,
        required: true
    },
    attemptNumber:{
        type: Number,
        required: true
    },
    code:{
        type: String,
        required: true
    }
});

export const TestResultSchema = new Schema({
    parcel: {
        type: ObjectId,
        required: true
    },
    tests:[{
        numberOfTest:{
            type: Number,
            required: true
        },
        result:{
            shortening: {
                type: String,
                required: true
            },
            message: String
        },
        time:{
            type: Number,
            required: true
        },
        memory:{
            type: Number,
            required: true
        }
    }]
});