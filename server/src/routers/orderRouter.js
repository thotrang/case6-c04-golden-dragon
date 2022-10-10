const express = require('express')
const router = express.Router();
const orderController = require('../controllers/orderController')
router.get('/',orderController.getAllOrder)
router.get('/:id',orderController.getDetailOrder)
router.delete('/:id',orderController.deleteOrder)
router.put('/:id',orderController.setstatus)
router.post('',orderController.createOrder)
router.get('/user/:id',orderController.myOrder)

module.exports = router;