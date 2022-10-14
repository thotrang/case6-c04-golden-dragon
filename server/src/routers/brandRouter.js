const brandController = require("../controllers/brandController");
const express = require ('express');
const router = express.Router();
const auth = require('../middleware/auth')
const checkSeller = require('../middleware/checkSeller')
router.get('/',brandController.getAllBrand);
router.post('/',auth,checkSeller,brandController.createBrand);
router.delete('/:id',auth,checkSeller,brandController.deleteBrand);
router.put('/:id',auth,checkSeller,brandController.updateBrand);
 

module.exports = router;