const express = require('express');
const roleController = require('../controllers/roleController');

const router = express.Router();
const auth = require('../middleware/auth');

router.use(auth)
router.get('', roleController.getRole);
router.post('', roleController.addRole);
router.get('/getStaffWithRole', roleController.getStaffWithRole)
module.exports = router