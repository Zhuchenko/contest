const sendmail = require('sendmail')();

const from = "contest@math.com";
const verifyEmailUrl = 'https://localhost:3000/verify-email';

export const VerifyEmail = (email, code) => {
    sendmail({
        from,
        to: email,
        subject: 'VerifyEmail',
        html: verifyEmailUrl + '?code=' + code,
    }, function(err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
    });
};

export const ChangePassword = (email, code) => {
    sendmail({
        from,
        to: email,
        subject: 'ChangePassword',
        html: code,
    }, function(err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
    });
};