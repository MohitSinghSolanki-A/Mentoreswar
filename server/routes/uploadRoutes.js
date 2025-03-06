const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../middleware/fileupload");
const { upload } = require("../controllers/uploadController");

router.post("/", uploadMiddleware, upload);

module.exports = router;
