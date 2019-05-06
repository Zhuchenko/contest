import express from 'express'
import { User } from '../mongoose/api/user'
import passport from 'passport'
import auth from './auth'
import '../config/passport'

const router = express.Router();

router.post('/signup', auth.optional, (req, res) => {
  const { body: { user } } = req;

  if(!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
  const finalUser = new User(user);

  finalUser.generateHash(user.password);

  return finalUser.save()
      .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

router.get('/signin', auth.required, (req, res) => {
  const { payload: { id } } = req;
  return User.findById(id)
      .then((user) => {
        if(!user) {
          return res.sendStatus(400);
        }
        return res.json({ user: user.toAuthJSON() });
      });
});

router.post('/signin', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return res.status(400).info;
  })(req, res, next);
});

module.exports = router;