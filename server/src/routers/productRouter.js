const productController = require("../controllers/productController");
const express = require('express');
const router = express.Router();

router.get('/products',productController.getAllProduct)
router.post('/products/create',productController.createProduct)
router.put('/products/:id',productController.updateProduct)
router.delete('/products/:id',productController.deleteProduct)
router.get('/products/:id',productController.getDetail)
router.put('/products/review/:idProduct',productController.addReview)
router.delete('/products/review/:idProduct/:id',productController.deleteReview)
router.put('/products/review/:idProduct/:id',productController.updateReview)
module.exports = router;