const express = require('express')
const router = express.Router();
const orderController = require('../controllers/orderController')
router.get('/',orderController.getAllOrderPending)
router.get('/:id',orderController.getDetailOrder)
router.delete('/:id',orderController.deleteOrder)
router.put('/:id',orderController.setstatus)
router.post('',orderController.createOrder)
router.get('/user/:id',orderController.myOrder)
router.put('/send/:id',orderController.sendOrder)
module.exports = router;