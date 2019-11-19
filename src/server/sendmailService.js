//import nodemailer from 'nodemailer'
const sendmail = require('sendmail')({
    devPort: 1025, // Default: False
    devHost: 'localhost', // Default: localhost
    smtpPort: 2525, // Default: 25
    smtpHost: 'localhost'
});

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

// export const VerifyEmail = async (email, code) => {
//     let testAccount = await nodemailer.createTestAccount();
//
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         host: 'localhost',
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//            user: testAccount.user, // generated ethereal user
//             pass: testAccount.pass // generated ethereal password
//         }
//     });
//
//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//         from, // sender address
//         to: email, // list of receivers
//         subject: 'Verify Email', // Subject line
//         text: 'Hello world?', // plain text body
//         html: verifyEmailUrl + '?code=' + code // html body
//     });
//
//     console.log('Message sent: %s', info.messageId);
// };

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