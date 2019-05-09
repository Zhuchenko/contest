import express from 'express'
import path from 'path'
import minimist from 'minimist'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import { connect } from './mongoose'
import { User } from './mongoose/api/user'
import expressSession  from 'express-session'
import passport from 'passport'

import authorizationRouter from './routes/authorization'
import problemRouter from './routes/problem'
import contestRouter from './routes/contest'
import groupRouter from './routes/groupOfUsers'
import setRouter from './routes/setOfProblems'
import parcelRouter from './routes/parcel'

import template from './template'

const argv = minimist(process.argv.slice(2));
const productionMode = argv.mode === 'production';

const serverConfig =
  productionMode ?
    require('./production.server.config')
    :
    require('./development.server.config');

console.log(
  productionMode ?
    'Contest server is starting with production mode...'
    :
    'Contest server is starting with development mode...');

const app = express();

app.set('port', serverConfig.port);
app.set('view endine', 'ejs');

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(expressSession({ secret: serverConfig.authorization.sessionSecret, resave: false, saveUninitialized: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', authorizationRouter);
app.use('/problems', problemRouter);
app.use('/contests', contestRouter);
app.use('/groups', groupRouter);
app.use('/sets', setRouter);
app.use('/parcels', parcelRouter);

app.get('/*', (req, res) => {
  res.send(template({
    assetsRoot: serverConfig.assetsRoot,
    username: req.isAuthenticated() ? req.user.username : ''
  }))
});

connect();

app.listen(app.get('port'), () => {
  console.log('Contest server is listening on port', app.get('port'))
});