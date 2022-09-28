const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter')
const roleRouter = require('./roleRouter')
const discountRouter = require('./discountRouter')

router.use('/user',userRouter)
router.use('/role',roleRouter)
router.use('/discount',discountRouter)
module.exports = router