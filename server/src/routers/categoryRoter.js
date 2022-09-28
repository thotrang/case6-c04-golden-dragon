const categoryController = require("../controllers/categoryController");
const express = require ('express');
const router = express.Router();

router.get('/',categoryController.getAllCategory);
router.post('/',categoryController.createCategory);
router.delete('/:id',categoryController.deleteCategory);
router.put('/:id',categoryController.updateCategory);
 

module.exports = router;