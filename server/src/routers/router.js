const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const roleRouter = require('./roleRouter');

router.use('/user', userRouter);
router.use('/role', roleRouter);
module.exports = router;
