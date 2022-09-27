const userController = require("../controllers/userController");
const express = require('express');
const router = express.Router();

router.get('/accountant',userController.getAccountant)

module.exports = router