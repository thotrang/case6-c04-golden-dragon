const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const roleRouter = require('./roleRouter');
const authRouter = require('./authRouter');
const productRouter = require('./productRouter');
const brandRouter = require('./brandRouter');
const categoryRouter = require('./categoryRouter')
const cartRouter  = require('./cartRouter')
const orderRouter = require('./orderRouter')
router.use('/admin', productRouter);

router.use('', authRouter);
router.use('/user', userRouter);
router.use('/role', roleRouter);
router.use('/brand', brandRouter);
router.use('/category', categoryRouter)
router.use('/cart',cartRouter);
router.use('/order',orderRouter)

module.exports = router;
