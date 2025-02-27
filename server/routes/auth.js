const express = require('express');
const { register, login, getAllUsers, getUserById } = require('../controllers/authController.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get("/:id", getUserById);
router.get("/", getAllUsers);

module.exports = router;
