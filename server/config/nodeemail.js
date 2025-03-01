const nodemailer = require("nodemailer");
require("dotenv").config();

console.log("📧 Email User:", process.env.EMAIL_USER);
console.log("🔑 Email Pass:", process.env.EMAIL_PASS);
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },

});

module.exports = transporter;
