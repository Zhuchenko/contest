import mongoose from 'mongoose'
import {serverConfig} from '../config/serverConfig'

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.Promise = Promise;

export const connect = () => {
    return mongoose.connect(serverConfig.databaseConnectionURL, { useNewUrlParser: true })
};