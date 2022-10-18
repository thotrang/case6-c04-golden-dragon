const chatController = require('../controllers/chatController')
const express = require ('express');
const router = express.Router();
const auth = require('../middleware/auth')
router.use(auth)
router.get('',chatController.getAllChat)
router.get('/:id',chatController.getDeltaiChat)
router.post('/',chatController.addChat)
router.put('/:id',chatController.addMessage)
module.exports = router;