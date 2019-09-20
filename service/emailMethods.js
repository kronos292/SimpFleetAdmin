const nodemailer = require("nodemailer");
const keys = require("../config/keys");
module.exports = {
  sendAutomatedEmail: async (email, subject, htmlText) => {
    // Generate email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: keys.email,
        pass: keys.password
      }
    });
    const mailOptions = {
      from: keys.email,
      to: email,
      subject: subject,
      html: htmlText
    };
    transporter.sendMail(mailOptions, async (err, info) => {
      if (err) {
        throw err;
      }

      console.log("Email sent: " + info.response);
    });
  },
  sendSignUpEmail: async addUser => {
    // Generate email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: keys.email,
        pass: keys.password
      }
    });
    const mailOptions = {
      from: keys.email,
      to: addUser.email,
      subject: "Automated send try",
      text: "thank you for registered to our platform"
    };
    transporter.sendMail(mailOptions, async (err, info) => {
      if (err) {
        throw err;
      }
      // Do not erase - Production Logging
      console.log("Email sent: " + info.response);
    });
  }
};
