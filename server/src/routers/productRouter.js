const productController = require("../controllers/productController");
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const checkSeller = require('../middleware/checkSeller')
router.get('/products',productController.getAllProduct)
router.post('/products/create',auth,checkSeller,productController.createProduct)
router.put('/products/:id',auth,checkSeller,productController.updateProduct)
router.delete('/products/:id',auth,checkSeller,productController.deleteProduct)
router.get('/products/:id',productController.getDetail)
router.put('/products/review/:idProduct',auth,productController.addReview)
router.delete('/products/review/:idProduct/:id',auth,productController.deleteReview)
router.put('/products/review/:idProduct/:id',auth,productController.updateComment)
router.put('/products/star/:idProduct',auth,productController.addStar)
module.exports = router;