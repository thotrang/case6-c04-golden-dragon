const productController = require("../src/controllers/productController");
const express = require('express');
const router = express.Router();

router.get('/products',productController.getAllProducts)
router.post('/products/create',productController.createProduct)
router.put('/products/:id',productController.updateProduct)
router.delete('/products/:id',productController.deleteProduct)
router.get('/products/:id',productController.getProductDetails)

module.exports = router