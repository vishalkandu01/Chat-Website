const router = require('express').Router()
const messageController = require('../controllers/messageController')

router.get('/messages', messageController.messageReceive);
router.post('/messages', messageController.messageSend)

module.exports = router