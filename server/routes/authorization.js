import express from 'express'
import { User } from '../mongoose/api/user'
import {getUserById, getUserByUsername, getUserByEmail} from '../mongoose/api/user';
import passport from 'passport'
import auth from './auth'
import '../config/passport'

const router = express.Router();

router.post('/signup', auth.optional, (req, res) => {
  const { body: { username, password, email, name, lastName } } = req;

  getUserByUsername(username)
      .then((user) => {
        if(user){
          return res.status(422).json({ username: { errorMessage: 'it already exists' } });
        }
      });

  getUserByEmail(email)
      .then((user) => {
        if(user){
          return res.status(422).json({ email: { errorMessage: 'it already exists' } });
        }
      });

  if(!username) {
    return res.status(422).json({ username: { errorMessage: 'it is required' } });
  }

  if(!password) {
    return res.status(422).json({ password: { errorMessage: 'it is required' } });
  }

  const finalUser = new User({username, email, name, lastName});
  finalUser.generateHash(password);

  return finalUser.save()
      .then(() => res.json({ ...finalUser.toAuthJSON() }));
});

router.get('/signin', auth.required, (req, res) => {
  const { payload: { id } } = req;

  return getUserById(id)
      .then((user) => {
        if(!user) {
          return res.sendStatus(400);
        }
        return res.json({ ...user.toAuthJSON() });
      });
});

router.post('/signin', auth.optional, (req, res, next) => {
  const { body: { username, password } } = req;

  if(!username) {
    return res.status(422).json({ username: { errorMessage: 'it is required' } });
  }

  if(!password) {
    return res.status(422).json({ password: { errorMessage: 'it is required' } });
  }

  getUserByUsername(username)
      .then((user) => {
        if(!user){
          return res.status(422).json({ username: { errorMessage: 'it is wrong' } });
        }
      });

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return res.status(500).json({ err });
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ ...user.toAuthJSON() });
    }

    return res.status(422).json({ password: { errorMessage: 'it is wrong' } });
  })(req, res, next);
});

module.exports = router;