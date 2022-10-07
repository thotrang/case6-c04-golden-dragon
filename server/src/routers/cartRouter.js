const express = require('express')
const router = express.Router();
const cartController = require('../controllers/cartController')
router.get('/',cartController.getAllBill)
router.post('/',cartController.createCart)
router.put('/:id',cartController.pustItem)
router.get('/:id',cartController.getItemIntoCart)
module.exports = router;