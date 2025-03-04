const Contact = require("../models/emailmodel");
const transporter = require("../middleware/nodemailer");
const nodemailer = require('nodemailer');

exports.submitContactForm = async (req, res) => {
    const { email, name, phone } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required!" });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your email in .env
            pass: process.env.EMAIL_PASS  // Your app password
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email, // Dynamic email from frontend
        subject: "Callback Request Received",
        text: `Hello ${name},\n\nWe have received your callback request. Our team will contact you soon.\n\nPhone: ${phone}\n\nBest Regards,\nYour Company`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error sending email" });
    }
}