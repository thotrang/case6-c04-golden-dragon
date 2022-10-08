const express = require('express')
const router = express.Router();
const cartController = require('../controllers/cartController')
const itemController = require('../controllers/itemController')
router.get('/',cartController.getAllBill)
router.post('/',cartController.createCart)
router.put('/:id',cartController.pustItem)
router.get('/:id',cartController.getItemIntoCart)
router.delete('/:id/:id_item',cartController.deleteItem)
router.delete('/:id',cartController.resetCart,itemController.deleteAllInCart)
module.exports = router;