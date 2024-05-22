const express = require('express');
const router = express.Router();

const { sendMessages, getMessage, getNotRedableMessage, readAllmessage } = require('../controllers/messageController');
const { messageValidation } = require('../middlewares/validation');

router.post('/send', messageValidation, sendMessages);

router.post('/get', getMessage);

router.post('/get/not-read', getNotRedableMessage);

router.post('/read', readAllmessage)

module.exports = router;