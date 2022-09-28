const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const roleRouter = require('./roleRouter');
const authRouter = require('../controllers/authController');

router.use('', authRouter);
router.use('/user', userRouter);
router.use('/role', roleRouter);
module.exports = router;
