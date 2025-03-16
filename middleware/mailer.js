const nodemailer = require('nodemailer');

module.exports = sendGmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        };
        const sendmail = await transporter.sendMail(mailOptions);
        return sendmail;
    } catch (error) {
        console.log(error);
    }
};
