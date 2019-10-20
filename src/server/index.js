import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import { connect } from './mongoose'
import {serverConfig} from "./config/serverConfig";

import authorizationRouter from './routes/authorization'
import problemRouter from './routes/problem'
import contestRouter from './routes/contest'
import groupRouter from './routes/groupOfUsers'
import setRouter from './routes/setOfProblems'
import parcelRouter from './routes/parcel'
import userRouter from './routes/user'

import template from './template'

const app = express();

app.set('port', serverConfig.port);
app.set('view endine', 'ejs');

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json());
app.use(fileUpload());

app.use('/api/', authorizationRouter);
app.use('/api/problems', problemRouter);
app.use('/api/contests', contestRouter);
app.use('/api/groups', groupRouter);
app.use('/api/sets', setRouter);
app.use('/api/parcels', parcelRouter);
app.use('/api/users', userRouter);

app.get('/*', (req, res) => {
  res.send(template({
    assetsRoot: serverConfig.assetsRoot
  }))
});

connect();

app.listen(app.get('port'), () => {
  console.log('Contest server is listening on port', app.get('port'))
});