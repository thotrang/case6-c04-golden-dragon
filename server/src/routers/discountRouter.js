const discountController = require("../controllers/discountController");
const express = require ('express');
const router = express.Router();

router.get('/',discountController.getAllDiscounts);
router.post('/',discountController.createDiscount);
// router.get('/:id',discountController.getDiscount)
router.delete('/:id',discountController.deleteDiscount);
router.put('/:id',discountController.updateDiscount);
 

module.exports = router;