const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const userRouter = require('./userRouter');
const roleRouter = require('./roleRouter');
const authRouter = require('../controllers/authController');
=======
const userRouter = require('./userRouter')
const roleRouter = require('./roleRouter')
const productRouter = require('./productRouter')

router.use('/admin',productRouter)
>>>>>>> son

router.use('', authRouter);
router.use('/user', userRouter);
router.use('/role', roleRouter);
module.exports = router;
