import sendmail from 'sendmail'

const from = 'contest@math.com';

export const VerifyEmail = (email, code) => {
    sendmail({
        from,
        to: email,
        subject: 'VerifyEmail',
        html: code,
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