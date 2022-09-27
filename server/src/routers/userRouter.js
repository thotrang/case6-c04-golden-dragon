const userController = require("../controllers/userController");
const express = require('express');
const router = express.Router();

router.get('/accountants',userController.getAccountant)
router.get('',userController.getAll)
router.delete(`/:id`,userController.deleteUser)
module.exports = router