const nodemailer = require("nodemailer");

async function sendMail(options) {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 25,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: "Geotrackr <geotrackr@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });
}

module.exports = sendMail;
