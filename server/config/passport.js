import passport from 'passport';
import LocalStrategy from 'passport-local';
import { User } from '../mongoose/api/user'

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => {
    User.findOne({ email })
        .then((user) => {
            if(!user) {
                return done(null, false, { errors: { 'email': 'is invalid' } });
            }
            if(!user.validatePassword(password)) {
                return done(null, false, { errors: { 'password': 'is invalid' } });
            }
            return done(null, user);
        }).catch(done);
}));