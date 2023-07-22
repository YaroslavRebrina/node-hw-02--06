const { EMAIL_ADDRESS, EMAIL_PASS } = process.env;
const nodemailer = require("nodemailer");

const verificationEmailer = ({ email, verificationToken }) => {
  try {
    const mailConfig = {
      host: "smtp.ukr.net",
      port: 2525,
      secure: true,
      auth: {
        user: EMAIL_ADDRESS,
        pass: EMAIL_PASS,
      },
    };

    const transposter = nodemailer.createTransport(mailConfig);

    const emailOptions = {
      from: EMAIL_ADDRESS,
      to: email,
      subject: "verification",
      text: `http://localhost:3000/api/users/verify/${verificationToken}`,
    };

    transposter
      .sendMail(emailOptions)
      .then((info) => console.log(info))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

module.exports = verificationEmailer;
