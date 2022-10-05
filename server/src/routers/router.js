const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const roleRouter = require('./roleRouter');
const authRouter = require('./authRouter');
const productRouter = require('./productRouter');

router.use('/admin', productRouter);

router.use('', authRouter);
router.use('/user', userRouter);
router.use('/role', roleRouter);
module.exports = router;
