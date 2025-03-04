const express = require("express");
const { submitContactForm } = require("../controllers/emailcontroller");

const router = express.Router();

// POST route for contact form submission
router.post("/email", submitContactForm);

module.exports = router;
