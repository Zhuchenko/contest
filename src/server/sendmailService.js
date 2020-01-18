const sendmail = require('sendmail')({
    smtpPort: 25,
    smtpHost: 'localhost'
});

const from = "kristina.volyakova@confirmit.com";
const verifyEmailUrl = 'https://localhost:3000/api/verify-email/';

export const VerifyEmail = (email, code) => {
    sendmail({
        from,
        to: email,
        subject: 'VerifyEmail',
        html: verifyEmailUrl + code,
    }, function(err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
    });
};
