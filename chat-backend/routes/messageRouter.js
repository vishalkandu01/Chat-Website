const router = require('express').Router()
const messageController = require('../controllers/messageController')

router.get('/message', messageController.messageReceive);
router.post('/message', messageController.messageSend)

module.exports = router