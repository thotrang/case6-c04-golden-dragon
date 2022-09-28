const express = require('express');
const router = express.Router();
const productRouter = require('./productRouter')

router.use('/admin',productRouter)
module.exports = router