import mongoose from 'mongoose'
import crypto from 'crypto-js'
import pbkdf2 from '../utils/pbkdf2'
import pbkdf2Config from '../config/pbkdf2Config'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import {serverConfig} from '../config/serverConfig'

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: String,
    lastName: String,
    roles: {
        type: [String],
        required: true
    },
    _hash: String,
    _salt: String
});

UserSchema.methods.generateHash = function (password) {
    this._salt = crypto.lib.WordArray.random(16);
    this._hash = pbkdf2(password, this._salt, serverConfig.authorization.salt, pbkdf2Config);
};

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
    options: [{
        language: {
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
    startingDate: {
        type: Date,
        //required: true
    },
    endingDate: {
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
    options: {
        language: {
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
    attemptNumber: {
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
    tests: [{
        number: {
            type: Number,
            required: true
        },
        result: {
            shortening: {
                type: String,
                required: true
            },
            message: String
        },
        time: {
            type: Number,
            //required: true
        },
        memory: {
            type: Number,
            //required: true
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

export const Code = new Schema({
    email: {
        type: String,
        required: true
    },
    code: {
        view: Boolean,
        edit: Boolean,
        delete: Boolean,
        changeRole: Boolean
    },
    date: {
        create: Boolean,
        view: Boolean,
        delete: Boolean,
    }
});