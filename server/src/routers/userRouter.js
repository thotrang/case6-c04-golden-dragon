const userController = require("../controllers/userController");
const express = require('express');
const router = express.Router();

router.get('/staffs',userController.getStaff)
router.get('',userController.getAll)
router.delete(`/:id`,userController.deleteUser)
router.post('/',userController.addUser)

module.exports = router