import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
import serverConfig from '../development.server.config.js'
import {UserSchema} from "./schemas";

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.Promise = Promise;

UserSchema.plugin(passportLocalMongoose);

export const connect = () => {
    return mongoose.connect(serverConfig.databaseConnectionURL, { useNewUrlParser: true })
};

export const maxAllowedAttachmentLength = 16 * 1024 * 1024; // 16MB