const express = require('express');
const roleAuth = require('../controllers/authController');

const router = express.Router();
router.post('/register', roleAuth.register);
router.post('/login', roleAuth.login);
module.exports = router;
