const express = require('express')
const router = express.Router();
const cartController = require('../controllers/cartController')
router.get('/',cartController.getAllBill)
router.post('/',cartController.createCart)
router.put('/:id',cartController.pustItem)
router.get('/:id',cartController.getDetailCart)
router.delete('/:id/:id_item',cartController.deleteItem)
router.delete('/:id',cartController.resetCart)
router.put('/:id/:id_item',cartController.updateAmountItem)
module.exports = router;