const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.API_KEY_EMAIL);

const sendWelcomeEmail = (name, email) => {
    const msg = {
        to: email,
        from: "caarts.tech@gmail.com",
        subject: "Welcome to CPutran.com",
        text: `Thanks for joining in.`,
        html: `<strong>Welcome to CPutran.com, ${name} Let me know how you get along with the app.</strong>`,
    };

    try {
        sgMail.send(msg);
    } catch (error) {
        console.error(error);
        if (error.response) {
            throw new Error(error.response.body);
        }
    }
};
const sendResetPasswordEmail = async(OTP, email) => {
    const msg = {
        to: email,
        from: "caarts.tech@gmail.com",
        subject: "Reset Password",
        html: `<strong>This is the One Time Password sent to your email.Kindly verify OTP.Your OTP is ${OTP}</strong>`,
    };

    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error(error);
        if (error.response) {
            throw new Error(error.response.body);
        }
    }
};

module.exports = { sendWelcomeEmail, sendResetPasswordEmail };