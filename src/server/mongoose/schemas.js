import mongoose from 'mongoose'
import crypto from 'crypto-js'
import pbkdf2 from '../utils/pbkdf2'
import pbkdf2Config from '../config/pbkdf2Config'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import {serverConfig} from '../config/serverConfig'

const Schema = mongoose.Schema;
const Decimal128 = mongoose.Schema.Types.Decimal128;

export const UnverifiedUserSchema = new Schema({
    email: {
        type: String
    },
    authKey: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    _hash: String,
    _salt: String
});

UnverifiedUserSchema.methods.generateHash = function (password) {
    this._salt = crypto.lib.WordArray.random(16);
    this._hash = pbkdf2(password, this._salt, serverConfig.authorization.salt, pbkdf2Config);
};

export const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: String,
    lastName: String,
    role: {
        type: String,
        required: true
    },
    _hash: String,
    _salt: String
});

UserSchema.methods.validatePassword = function (password) {
    const hash = pbkdf2(password, this._salt, serverConfig.authorization.salt, pbkdf2Config);
    return this._hash === hash;
};

UserSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, fs.readFileSync(path.join(__dirname, '../..', serverConfig.session.privateKeyPath)), {algorithm: 'RS256'});
};

UserSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
};

export const GroupOfUsersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    users: [String],
    authorId: {
        type: String,
        required: true
    },
    sharedReadRights: [String],
    sharedWriteRights: [String]
});

export const ProblemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    languages: [String],
    generator: {
        type: Buffer,
        required: true
    },
    checker: {
        type: Buffer,
        required: true
    },
    limitation: {
        time: {
            type: Number,
            required: true
        },
        memory: {
            type: Number,
            required: true
        }
    },
    tests: [{
        input: {
            type: Buffer,
            required: true
        },
        output: {
            type: Buffer,
            required: true
        },
        number: {
            type: Number,
            required: true
        },
        description: String
    }],
    numberOfTests: {
        type: Number,
        required: true
    },
    sharedReadRights: [String],
    sharedWriteRights: [String]
});

export const SetOfProblemsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    problems: [String],
    sharedReadRights: [String],
    sharedWriteRights: [String]
});

export const ContestSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    sets: [String],
    groups: [String],
    authorId: {
        type: String,
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
    startingDate: {
        type: Date,
        required: true
    },
    endingDate: {
        type: Date,
        required: true
    },
    sharedReadRights: [String],
    sharedWriteRights: [String]
});

export const ParcelSchema = new Schema({
    authorId: {
        type: String,
        required: true
    },
    problemId: {
        type: String,
        required: true
    },
    contestId: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    code: {
        type: Buffer,
        default: Buffer.from(''),
        required: true
    },
    date: {
        type: Date,
        required: true
    },
});

export const SolutionSchema = new Schema({
    authorId: {
        type: String,
        required: true
    },
    problemId: {
        type: String,
        required: true
    },
    contestId: {
        type: String,
        required: true
    },
    attemptNumber: {
        type: Number,
        required: true
    },
    code: {
        type: Buffer,
        default: Buffer.from(''),
        required: true
    }
});

export const TestResultSchema = new Schema({
    parcelId: {
        type: String,
        required: true
    },
    tests: [{
        number: {
            type: Number,
            required: true
        },
        shortening: {
            type: String,
            required: true
        },
        message: String,
        time: {
            type: Decimal128,
            required: true
        },
        memory: {
            type: Decimal128,
            required: true
        }
    }]
});

export const RoleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rights: {
        user: {
            view: Boolean,
            edit: Boolean,
            delete: Boolean,
            changeRole: Boolean
        },
        groupOfUsers: {
            create: Boolean,
            view: Boolean,
            delete: Boolean,
        },
        problem: {
            create: Boolean,
            view: Boolean,
            delete: Boolean,
        },
        setOfProblems: {
            create: Boolean,
            view: Boolean,
            delete: Boolean,
        },
        contest: {
            create: Boolean,
            view: Boolean,
            delete: Boolean,
        }
    }
});

export const CodeSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    }
});