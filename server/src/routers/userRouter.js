const userController = require("../controllers/userController");
const express = require('express');
const router = express.Router();

router.get('/staffs',userController.getStaff)
router.get('',userController.getAll)
router.get('/:id',userController.getDetail)
router.delete(`/:id`,userController.deleteUser)
router.post('/',userController.addStaff)
router.put('/updateRoleUser/:id',userController.updateRoleUser)
router.put('/update/:id',userController.updateUser)
router.get('/searchStaff/:q',userController.searchStaff)
router.get('/searchUser/:q',userController.searchUser)


module.exports = router