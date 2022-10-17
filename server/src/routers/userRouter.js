const userController = require("../controllers/userController");
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const checkAdmin = require('../middleware/checkAdmin')
router.use(auth)
router.get('/staffs',checkAdmin,userController.getStaff)
router.get('',userController.getAll)
router.get('/:id',userController.getDetail)
router.delete(`/:id`,checkAdmin,userController.deleteUser)
router.post('/',checkAdmin,userController.addStaff)
router.put('/updateRoleUser/:id',checkAdmin,userController.updateRoleUser)
router.put('/update/:id',userController.updateUser)
router.get('/searchStaff/:q',checkAdmin,userController.searchStaff)
router.get('/searchUser/:q',userController.searchUser)


module.exports = router