const express = require('express')
const router = express.Router();
const orderController = require('../controllers/orderController')
const auth = require('../middleware/auth')
const checkUser = require('../middleware/checkUser')
const checkAccountant = require('../middleware/checkAccountant')
router.use(auth)
router.get('/',checkAccountant,orderController.getAllOrderPending)
router.get('/:id',orderController.getDetailOrder)
router.delete('/:id',checkUser,orderController.deleteOrder)
router.put('/:id',orderController.setstatus)
router.post('',checkUser,orderController.createOrder)
router.get('/user/:id',checkUser,orderController.myOrder)
router.put('/send/:id',checkUser,orderController.sendOrder)
router.put('/cancel/:id',checkAccountant,orderController.delOrder)
router.put('/ok/:id',checkAccountant,orderController.okOrder)

module.exports = router;