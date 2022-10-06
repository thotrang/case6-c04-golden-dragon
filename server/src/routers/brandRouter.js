const brandController = require("../controllers/brandController");
const express = require ('express');
const router = express.Router();

router.get('/',brandController.getAllBrand);
router.post('/',brandController.createBrand);
router.delete('/:id',brandController.deleteBrand);
router.put('/:id',brandController.updateBrand);
 

module.exports = router;