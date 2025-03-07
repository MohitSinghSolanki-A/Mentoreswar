const cloudinary = require("../config/cloudinary");
const Submission = require("../models/uploadmodel");

exports.upload = async (req, res) => {
    try {
        // Use `req.file`, not `req.files`
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const file = req.file.path; // Path where multer saved the file

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(file, {
            resource_type: "auto",
            folder: "answer_sheets",
        });

        // Save to DB
        const newSubmission = new Submission({
            userId: req.body.userId, // Ensure frontend sends `studentId`
            pdfUrl: result.secure_url,
        });

        await newSubmission.save();

        res.json({
            message: "File uploaded successfully",
            file: req.file.filename,
            cloudinaryUrl: result.secure_url,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
