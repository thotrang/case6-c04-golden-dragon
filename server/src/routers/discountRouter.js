const discountController = require("../controllers/discountController");
const express = require ('express');
const router = express.Router();
const auth = require('../middleware/auth')
router.use(auth)
router.get('/',discountController.getAllDiscounts);
router.post('/',discountController.createDiscount);
router.delete('/:id',discountController.deleteDiscount);
router.put('/:id',discountController.updateDiscount);
 

module.exports = router;