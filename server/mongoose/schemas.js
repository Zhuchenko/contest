import mongoose from 'mongoose'
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    name: String,
    lastName: String,
    _hash: String,
    _salt: String
});

UserSchema.methods.generateHash = function(password) {
    this._salt = crypto.randomBytes(16).toString('hex');
    this._hash = crypto.pbkdf2Sync(password, this._salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this._salt, 10000, 512, 'sha512').toString('hex');
    return this._hash === hash;
};

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        username: this.username,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}

UserSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        username: this.username,
        token: this.generateJWT(),
    };
};

export const GroupOfUsersSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    users: [ObjectId]
});

export const ProblemSchema = new Schema({
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

export const ContestSchema = new Schema({
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
    isFinished: {
        type: Boolean,
        required: true
    },
    startingDate:{
        type: Date,
        //required: true
    },
    endingDate:{
        type: Date,
        //required: true
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
        type: Buffer,
        default: new Buffer(''),
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
    code: {
        type: Buffer,
        default: new Buffer(''),
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