const Contact = require("../models/email.js");
const transporter = require("../config/nodeemail.js");

exports.submitContactForm = async (req, res) => {
    const { name, email, phone } = req.body;

    try {
        // Save to database
        const contact = new Contact({ name, email, phone });
        await contact.save();

        // Email details
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECEIVER,
            subject: "New Contact Request",
            text: `New contact request:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        res.json({ message: "Request submitted successfully!" });

    } catch (error) {
        res.status(500).json({ message: "Error processing request", error });
    }
};
