const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter')
const roleRouter = require('./roleRouter')
const productRouter = require('./productRouter')

router.use('/admin',productRouter)
const discountRouter = require('./discountRouter')
const categoryRouter = require('./categoryRoter')

router.use('/user',userRouter)
router.use('/role',roleRouter)
router.use('/discount',discountRouter)
router.use('/category',categoryRouter)
module.exports = router