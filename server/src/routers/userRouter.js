const userController = require("../controllers/userController");
const express = require('express');
const {createProductReview} = require("../controllers/productController");
const productController = require("../controllers/productController");
const router = express.Router();
const auth = require('../middleware/auth');

// router.use(auth)
router.get('/staffs',userController.getStaff)
router.get('',userController.getAll)
router.get('/:id',userController.getDetail)
router.delete(`/:id`,userController.deleteUser)
router.post('/',userController.addStaff)
router.put('/updateRoleUser/:id',userController.updateRoleUser)
router.put('/update/:id',userController.updateUser)
router.get('/searchStaff/:q',userController.searchStaff)
router.get('/searchUser/:q',userController.searchUser)
// router.put('/review',productController.createProductReview)


module.exports = router