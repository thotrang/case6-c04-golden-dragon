const userController = require("../controllers/userController");
const express = require('express');
const router = express.Router();

router.get('/accountant',userController.getAccountant)
router.get('',userController.getAll)
module.exports = router