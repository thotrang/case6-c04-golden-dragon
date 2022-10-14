const categoryController = require("../controllers/categoryController");
const express = require ('express');
const router = express.Router();

const auth = require('../middleware/auth')
const checkSeller = require('../middleware/checkSeller')
router.get('/',categoryController.getAllCategory);
router.post('/',auth,checkSeller,categoryController.createCategory);
router.delete('/:id',auth,checkSeller,categoryController.deleteCategory);
router.put('/:id',auth,checkSeller,categoryController.updateCategory);
 

module.exports = router;